// ========================================
// FILE: utils/storageProvider.js
// ========================================
const LocalStorage = require('./localStorage');
const S3Storage = require('./s3Storage');

/**
 * Storage Provider Factory
 * Manages different storage backends (Local, S3, etc.)
 *
 * Usage:
 * const StorageProvider = require('./utils/storageProvider');
 * const result = await StorageProvider.uploadFile(file, 'path/to/file.jpg');
 */
class StorageProvider {
  constructor() {
    this.storage = null;
    this.storageType = null;
    this.initialized = false;
  }

  /**
   * Initialize the storage provider based on environment configuration
   */
  initialize() {
    if (this.initialized) {
      return;
    }

    const storageType = (process.env.STORAGE_TYPE || 'local').toLowerCase().trim();

    switch (storageType) {
      case 's3':
      case 'aws':
        this.storage = new S3Storage();
        this.storageType = 'S3';
        break;

      case 'local':
      case 'filesystem':
      default:
        this.storage = new LocalStorage();
        this.storageType = 'Local';
        break;
    }

    this.initialized = true;
    console.log(`📦 Storage Provider Initialized: ${this.storageType}`);
  }

  /**
   * Ensure storage provider is initialized before any operation
   */
  ensureInitialized() {
    if (!this.initialized) {
      this.initialize();
    }
  }

  /**
   * Upload a file to the configured storage
   * @param {Object} file - File object from multer (contains buffer or path)
   * @param {string} filePath - Destination path for the file
   * @returns {Promise<Object>} - { filePath, fileUrl, fullPath? }
   */
  async uploadFile(file, filePath) {
    this.ensureInitialized();

    try {
      const result = await this.storage.uploadFile(file, filePath);
      console.log(`✅ File uploaded successfully: ${filePath}`);
      return result;
    } catch (error) {
      console.error(`❌ File upload failed: ${filePath}`, error);
      throw new Error(`Storage upload failed: ${error.message}`);
    }
  }

  /**
   * Delete a file from storage
   * @param {string} filePath - Path of the file to delete
   * @returns {Promise<Object>} - { success: boolean, error?: string }
   */
  async deleteFile(filePath) {
    this.ensureInitialized();

    try {
      const result = await this.storage.deleteFile(filePath);

      if (result.success) {
        console.log(`✅ File deleted successfully: ${filePath}`);
      } else {
        console.warn(`⚠️ File deletion failed: ${filePath}`, result.error);
      }

      return result;
    } catch (error) {
      console.error(`❌ File deletion error: ${filePath}`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get the URL for accessing a file
   * @param {string} filePath - Path of the file
   * @param {number} expiresIn - Expiration time in seconds (for signed URLs)
   * @returns {Promise<string>} - File URL
   */
  async getFileUrl(filePath, expiresIn = 3600) {
    this.ensureInitialized();

    try {
      const url = await this.storage.getFileUrl(filePath, expiresIn);
      return url;
    } catch (error) {
      console.error(`❌ Failed to get file URL: ${filePath}`, error);
      throw new Error(`Failed to get file URL: ${error.message}`);
    }
  }

  /**
   * List files with a given prefix (if supported by storage)
   * @param {string} prefix - Prefix to filter files
   * @returns {Promise<Array>} - Array of file objects
   */
  async listFiles(prefix) {
    this.ensureInitialized();

    if (typeof this.storage.listFiles !== 'function') {
      throw new Error(`List files not supported by ${this.storageType} storage provider`);
    }

    try {
      const files = await this.storage.listFiles(prefix);
      return files;
    } catch (error) {
      console.error(`❌ Failed to list files: ${prefix}`, error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Check if a file exists in storage
   * @param {string} filePath - Path of the file to check
   * @returns {Promise<boolean>}
   */
  async fileExists(filePath) {
    this.ensureInitialized();

    if (typeof this.storage.fileExists === 'function') {
      return this.storage.fileExists(filePath);
    }

    // Fallback: try to get file URL
    try {
      await this.storage.getFileUrl(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get storage type information
   * @returns {string} - Current storage type
   */
  getStorageType() {
    this.ensureInitialized();
    return this.storageType;
  }

  /**
   * Get storage provider instance (for advanced usage)
   * @returns {Object} - Storage provider instance
   */
  getStorageInstance() {
    this.ensureInitialized();
    return this.storage;
  }

  /**
   * Validate file before upload
   * @param {Object} file - File object to validate
   * @param {Object} options - Validation options
   * @returns {Object} - { valid: boolean, error?: string }
   */
  validateFile(file, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedMimeTypes = [],
      allowedExtensions = [],
    } = options;

    // Check if file exists
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }

    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
      };
    }

    // Check MIME type
    if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: `File type ${file.mimetype} is not allowed`,
      };
    }

    // Check file extension
    if (allowedExtensions.length > 0) {
      const fileExt = file.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        return {
          valid: false,
          error: `File extension .${fileExt} is not allowed`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Batch upload multiple files
   * @param {Array} files - Array of file objects
   * @param {Function} pathGenerator - Function to generate file path for each file
   * @returns {Promise<Array>} - Array of upload results
   */
  async uploadMultipleFiles(files, pathGenerator) {
    this.ensureInitialized();

    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }

    const uploadPromises = files.map((file, index) => {
      const filePath =
        typeof pathGenerator === 'function'
          ? pathGenerator(file, index)
          : `${Date.now()}_${index}_${file.originalname}`;

      return this.uploadFile(file, filePath);
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('❌ Batch upload failed', error);
      throw new Error(`Batch upload failed: ${error.message}`);
    }
  }

  /**
   * Batch delete multiple files
   * @param {Array} filePaths - Array of file paths to delete
   * @returns {Promise<Array>} - Array of deletion results
   */
  async deleteMultipleFiles(filePaths) {
    this.ensureInitialized();

    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      return [];
    }

    const deletePromises = filePaths.map(filePath => this.deleteFile(filePath));

    try {
      const results = await Promise.allSettled(deletePromises);
      return results.map((result, index) => ({
        filePath: filePaths[index],
        success: result.status === 'fulfilled' && result.value.success,
        error: result.status === 'rejected' ? result.reason : result.value.error,
      }));
    } catch (error) {
      console.error('❌ Batch deletion failed', error);
      throw new Error(`Batch deletion failed: ${error.message}`);
    }
  }

  /**
   * Copy a file within storage (if supported)
   * @param {string} sourcePath - Source file path
   * @param {string} destinationPath - Destination file path
   * @returns {Promise<Object>}
   */
  async copyFile(sourcePath, destinationPath) {
    this.ensureInitialized();

    if (typeof this.storage.copyFile === 'function') {
      return this.storage.copyFile(sourcePath, destinationPath);
    }

    throw new Error(`Copy file not supported by ${this.storageType} storage provider`);
  }

  /**
   * Move a file within storage (if supported)
   * @param {string} sourcePath - Source file path
   * @param {string} destinationPath - Destination file path
   * @returns {Promise<Object>}
   */
  async moveFile(sourcePath, destinationPath) {
    this.ensureInitialized();

    if (typeof this.storage.moveFile === 'function') {
      return this.storage.moveFile(sourcePath, destinationPath);
    }

    throw new Error(`Move file not supported by ${this.storageType} storage provider`);
  }

  /**
   * Get storage statistics (if supported)
   * @returns {Promise<Object>} - Storage statistics
   */
  async getStorageStats() {
    this.ensureInitialized();

    if (typeof this.storage.getStats === 'function') {
      return this.storage.getStats();
    }

    return {
      storageType: this.storageType,
      statsAvailable: false,
      message: `Statistics not available for ${this.storageType} storage`,
    };
  }
}

// Export as singleton
module.exports = new StorageProvider();
