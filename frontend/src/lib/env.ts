const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const API_BASE_URL = getEnv(
  "NEXT_PUBLIC_API_URL",
  "http://localhost:8000"
);
