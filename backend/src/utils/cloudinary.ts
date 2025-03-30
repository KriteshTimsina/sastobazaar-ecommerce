import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } from "./env";


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
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
