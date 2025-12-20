import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5002;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
