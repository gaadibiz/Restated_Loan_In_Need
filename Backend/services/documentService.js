// ========================================
// FILE: services/documentVerificationService.js
// ========================================
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserDocumentModel = require('../models/documentModel');
const { BadRequestError } = require('../GlobalExceptionHandler/exception');
const crypto = require('crypto');
const OtpService = require('./otpService');
const StorageProvider = require('../utils/storageProvider.js');
const fs = require('fs').promises;

class DocumentVerificationService {
  /**
   * Upload Bank Statements + Salary Slips
   * ✅ Selfie NOT uploaded here anymore
   * ✅ After upload → OTP sent for Selfie verification
   */
  async submitDocuments(userId, files) {
    const bankStatements = files?.bankStatements || [];
    const salarySlips = files?.salarySlips || [];

    if (bankStatements.length === 0) {
      throw new BadRequestError('At least one bank statement is required');
    }

    if (salarySlips.length === 0) {
      throw new BadRequestError('At least one salary slip is required');
    }

    const result = await prisma.$transaction(async tx => {
      const uploadedDocs = [];

      // ✅ Upload Bank Statements
      for (const file of bankStatements) {
        const doc = await this.storeFile(file, userId, 'BANK_STATEMENT', tx);
        uploadedDocs.push(doc);
      }

      // ✅ Upload Salary Slips
      for (const file of salarySlips) {
        const doc = await this.storeFile(file, userId, 'PAY_SLIP', tx);
        uploadedDocs.push(doc);
      }

      return uploadedDocs;
    });

    // ✅ Send OTP for selfie verification
    await OtpService.sendOtp(userId);

    return {
      message: 'Documents uploaded successfully. OTP sent for selfie verification ✅',
      isSelfiePending: true,
      uploadedDocs: result,
    };
  }

  /**
   * Store file using configured storage provider (Local or S3)
   */
  async storeFile(file, userId, type, tx) {
    // Fetch User to get Name for folder structure
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, customUserId: true },
    });

    const userName = user?.name ? user.name.replace(/\s+/g, '_') : 'Unknown_User';
    const userFolder = `${userName}_${userId}`;

    // Determine document type folder
    let documentTypeFolder = 'Others';
    if (type === 'BANK_STATEMENT') {
      documentTypeFolder = 'BankStatements';
    } else if (type === 'PAY_SLIP') documentTypeFolder = 'SalarySlips';
    else if (type === 'PHOTO') documentTypeFolder = 'Selfies';

    // Construct file path: [Document Type]/[Username_UserId]/[Timestamp_Filename]
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `${documentTypeFolder}/${userFolder}/${fileName}`;

    // Calculate Checksum - FIX: Properly handle buffer retrieval
    let fileBuffer;
    if (file.buffer) {
      fileBuffer = file.buffer;
    } else if (file.path) {
      fileBuffer = await fs.readFile(file.path);
    } else {
      throw new Error('File must have either path or buffer');
    }

    const checksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Upload using Storage Provider
    const uploadResult = await StorageProvider.uploadFile(file, filePath);

    // Save document metadata to database
    const document = await UserDocumentModel.createDocument(
      userId,
      {
        fileName: file.originalname,
        filePath: uploadResult.filePath,
        fileUrl: uploadResult.fileUrl,
        type,
        mimeType: file.mimetype,
        size: file.size,
        checksum,
        status: 'SUBMITTED',
      },
      tx
    );

    return document;
  }

  /**
   * Get Document Status
   */
  async getDocumentStatus(userId) {
    const docs = await UserDocumentModel.getDocumentsByUserId(userId);
    const isSelfieUploaded = docs.some(d => d.type === 'PHOTO');

    return {
      docs,
      isSelfieUploaded,
      status: isSelfieUploaded ? 'Selfie Completed' : 'Pending Selfie Upload',
    };
  }

  /**
   * Delete a document (removes from storage + DB)
   */
  async deleteDocument(documentId, userId) {
    const document = await UserDocumentModel.getDocumentById(documentId);

    if (!document || document.userId !== userId) {
      throw new BadRequestError('Document not found or unauthorized');
    }

    // Delete from storage
    await StorageProvider.deleteFile(document.filePath);

    // Delete from database
    await UserDocumentModel.deleteDocument(documentId);

    return { message: 'Document deleted successfully' };
  }
}

module.exports = new DocumentVerificationService();

// ========================================
// FILE: utils/storageProvider.js
// ========================================

// ========================================
// FILE: .env.example
// ========================================
// Storage Configuration
// STORAGE_TYPE=local  # Options: 'local' or 's3'

// Local Storage Configuration
// LOCAL_STORAGE_PATH=uploads

// AWS S3 Configuration (only needed if STORAGE_TYPE=s3)
// AWS_REGION=us-east-1
// AWS_ACCESS_KEY_ID=your_access_key
// AWS_SECRET_ACCESS_KEY=your_secret_key
// AWS_S3_BUCKET_NAME=your_bucket_name
