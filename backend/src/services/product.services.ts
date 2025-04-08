import path from "path";
import fs from "fs";

export const deleteProductImage = async (image: string | string[]): Promise<boolean> => {
  try {
    const imagePaths = [];

    if (typeof image === "string") {
      const imagePath = path.join(__dirname, "../uploads", image);
      imagePaths.push(imagePath);
    } else {
      image.forEach(img => {
        const imagePath = path.join(__dirname, "../uploads", img);
        imagePaths.push(imagePath);
      });
    }

    if (imagePaths.length > 0) {
      imagePaths.forEach((image: string) => {
        if (fs.existsSync(image)) {
          fs.unlink(image, err => {
            if (err) {
              return false;
            }
          });
        }
        return true;
      });
    }
    return false;
  } catch (error) {
    console.log(error, "Error deleting image");
    return false;
  }
};
