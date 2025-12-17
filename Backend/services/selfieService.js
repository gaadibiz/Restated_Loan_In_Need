const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { supabase } = require("../config/supabase");
const fs = require("fs").promises;
const crypto = require("crypto");
const { BadRequestError } = require("../GlobalExceptionHandler/exception");

const saveSelfie = async (userId, file) => {
  if (!file) throw new BadRequestError("Selfie upload failed: No file received"); // Fixed error message grammar

  // Fetch User to get Name for folder structure
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  const userName = user?.name ? user.name.replace(/\s+/g, "_") : "Unknown_User";
  const userFolder = `${userName}_${userId}`;

  // Target Directory
  const targetDir = `uploads/Selfies/${userFolder}`;
  const targetPath = `${targetDir}/${Date.now()}_${file.originalname}`;

  // Ensure directory exists
  await fs.mkdir(targetDir, { recursive: true });

  // Move file from temp to target
  await fs.rename(file.path, targetPath);

  // Generate checksum
  const fileBuffer = await fs.readFile(targetPath);
  const checksum = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  // Local URL/Path
  const fileUrl = targetPath;

  // Save selfie in UserDocument table
  const selfieDoc = await prisma.userDocument.create({
    data: {
      userId,
      docType: "PHOTO",
      fileName: file.originalname,
      filePath: targetPath,
      fileUrl: fileUrl,
      mimeType: file.mimetype,
      size: file.size,
      checksum: checksum,
      status: "SUBMITTED"
    }
  });

  return {
    message: "Selfie uploaded successfully",
    selfie: selfieDoc
  };
};

const getSelfieStatus = async (userId) => {
  const selfie = await prisma.userDocument.findFirst({
    where: { userId, docType: "PHOTO" },
    orderBy: { uploadedAt: "desc" }
  });

  return selfie
    ? { uploaded: true, status: selfie.status }
    : { uploaded: false, status: "PENDING" };
};

module.exports = { saveSelfie, getSelfieStatus };
