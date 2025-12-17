const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const UserDocumentModel = require("../models/documentModel");
const { supabase } = require("../config/supabase");
const { BadRequestError } = require("../GlobalExceptionHandler/exception");

const fs = require("fs").promises;
const crypto = require("crypto");
const OtpService = require("./otpService");

class DocumentVerificationService {

  /**
   * Upload Bank Statements + Salary Slips
   * ✅ Selfie NOT uploaded here anymore
   * ✅ After upload → OTP sent for Selfie verification
   * ✅ NO MULTIPLE DOCUMENT LIMIT CHECKS ANYMORE
   */
  async submitDocuments(userId, files) {
    const bankStatements = files?.bankStatements || [];
    const salarySlips = files?.salarySlips || [];

    if (bankStatements.length === 0) {
      throw new BadRequestError("At least one bank statement is required");
    }

    if (salarySlips.length === 0) {
      throw new BadRequestError("At least one salary slip is required");
    }

    const result = await prisma.$transaction(async (tx) => {
      const uploadedDocs = [];

      // ✅ Upload Bank Statements
      for (const file of bankStatements) {
        const filePath = `KycDocs/bank-statements/${userId}/${Date.now()}_${file.originalname}`;
        const doc = await this.storeFile(file, userId, filePath, "BANK_STATEMENT", tx);
        uploadedDocs.push(doc);
      }

      // ✅ Upload Salary Slips
      for (const file of salarySlips) {
        const filePath = `KycDocs/salary-slips/${userId}/${Date.now()}_${file.originalname}`;
        const doc = await this.storeFile(file, userId, filePath, "PAY_SLIP", tx);
        uploadedDocs.push(doc);
      }

      return uploadedDocs;
    });

    // ✅ Send OTP for selfie verification
    await OtpService.sendOtp(userId);

    return {
      message: "Documents uploaded successfully. OTP sent for selfie verification ✅",
      isSelfiePending: true,
      uploadedDocs: result,
    };
  }

  /**
   * Store file in Local File System + Save metadata in DB
   */
  async storeFile(file, userId, fileDirName, type, tx) {
    // Fetch User to get Name for folder structure
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, customUserId: true },
    });

    const userName = user?.name ? user.name.replace(/\s+/g, "_") : "Unknown_User";
    const userFolder = `${userName}_${userId}`;

    // Construct Target Directory: uploads/[Document Type]/[User Name + User ID]/
    // Note: fileDirName passed from submitDocuments is like "KycDocs/bank-statements/..." 
    // We will override this structure to match the specific requirement:
    // [Upload Root]/[Document Name]/[User Name + User ID]/[File]

    let documentTypeFolder = "Others";
    if (type === "BANK_STATEMENT") documentTypeFolder = "BankStatements";
    else if (type === "PAY_SLIP") documentTypeFolder = "SalarySlips";
    else if (type === "PHOTO") documentTypeFolder = "Selfies";

    const targetDir = `uploads/${documentTypeFolder}/${userFolder}`;
    const targetPath = `${targetDir}/${Date.now()}_${file.originalname}`;

    // Ensure directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Move file from temp to target
    await fs.rename(file.path, targetPath);

    // Calculate Checksum
    const fileBuffer = await fs.readFile(targetPath);
    const checksum = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Construct a local URL or relative path to store
    const fileUrl = targetPath; // For local storage, we just store the path

    const document = await UserDocumentModel.createDocument(
      userId,
      {
        fileName: file.originalname,
        filePath: targetPath,
        fileUrl: fileUrl,
        type,
        mimeType: file.mimetype,
        size: file.size,
        checksum,
        status: "SUBMITTED",
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
    const isSelfieUploaded = docs.some((d) => d.type === "PHOTO");

    return {
      docs,
      isSelfieUploaded,
      status: isSelfieUploaded ? "Selfie Completed" : "Pending Selfie Upload",
    };
  }
}

module.exports = new DocumentVerificationService();
