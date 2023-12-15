import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadToCloud = async (localFilePath: any) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (response) {
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.log("Error deleting file locally");
        }
      });
      return response.secure_url;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
