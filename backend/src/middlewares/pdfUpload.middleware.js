import multer from "multer";
import { MAX_PDF_SIZE } from "../services/sizeLimiter.js"
const storage = multer.memoryStorage();

const uploadPdf = multer({
  storage,
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  }
});

export default uploadPdf;
