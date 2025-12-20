import axios from "axios";

export const BASE_URL = "https://api.toolshub.me";

/**
 * Generic PDF upload handler
 * @param {string} url
 * @param {File[]} files
 * @returns blob (downloadable file)
 */
const uploadPdf = async (url, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));

  const response = await axios.post(url, formData, {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ===================== PDF APIs ===================== */

export const mergePdf = (files) =>
  uploadPdf(`${BASE_URL}/pdf/merge`, files);

export const compressPdf = (files) =>
  uploadPdf(`${BASE_URL}/pdf/compress`, files);

export const splitPdf = (files) =>
  uploadPdf(`${BASE_URL}/pdf/split`, files);

export const pdfToWord = (files) =>
  uploadPdf(`${BASE_URL}/pdf/convert-to-word`, files);

export const wordToPdf = (files) =>
  uploadPdf(`${BASE_URL}/pdf/convert-to-pdf`, files);

/* ===================== IMAGE APIs ===================== */

export const compressImage = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await axios.post(
    `${BASE_URL}/image/compress`,
    formData,
    { responseType: "blob" }
  );

  return response.data;
};
