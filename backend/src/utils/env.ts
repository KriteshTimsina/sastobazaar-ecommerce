const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "8000");
export const MONGODB_URI = getEnv("MONGODB_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");

//cloudinary
export const CLOUD_NAME = getEnv("CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_SECRET_KEY = getEnv("CLOUDINARY_SECRET_KEY");
