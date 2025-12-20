import multer from "multer";
import { MAX_FILE_SIZE } from "../config/env.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
          console.log("first")

      cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  }
});

export default upload;
