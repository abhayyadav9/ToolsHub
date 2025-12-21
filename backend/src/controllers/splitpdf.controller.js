import { PDFDocument } from "pdf-lib";
import archiver from "archiver";
import { MAX_PAGES } from "../services/sizeLimiter.js";

export const pdfSplitter = async (req, res) => {

  try {
    /* -------- 1. ROBUST VALIDATION -------- */
    const splitAt = parseInt(req.body.splitAt);
    console.log(splitAt)
    
    if (isNaN(splitAt) || splitAt <= 0) {
      return res.status(400).json({ error: "Invalid split value. Must be a positive number." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required." });
    }

    /* -------- 2. LOAD PDF (Optimized) -------- */
    // Load the document. throws error if corrupt
    const pdf = await PDFDocument.load(req.file.buffer, { ignoreEncryption: true });
    const totalPages = pdf.getPageCount();

    /* -------- 3. LOGIC CHECKS -------- */
    if (totalPages > MAX_PAGES) {
      return res.status(400).json({
        error: `PDF is too large (${totalPages} pages). Max allowed is ${MAX_PAGES}.`
      });
    }

    if (splitAt >= totalPages) {
      return res.status(400).json({
        error: `Split point (${splitAt}) cannot be greater than or equal to total pages (${totalPages}).`
      });
    }

    /* -------- 4. PARALLEL DOCUMENT CREATION -------- */
    // Create two new documents concurrently
    const [pdf1, pdf2] = await Promise.all([
      PDFDocument.create(),
      PDFDocument.create()
    ]);

    // Calculate page indices
    const range1 = Array.from({ length: splitAt }, (_, i) => i);
    const range2 = Array.from({ length: totalPages - splitAt }, (_, i) => i + splitAt);

    // Copy pages concurrently (Faster than sequential await)
    const [pages1, pages2] = await Promise.all([
      pdf1.copyPages(pdf, range1),
      pdf2.copyPages(pdf, range2)
    ]);

    // Add pages to new documents
    pages1.forEach((p) => pdf1.addPage(p));
    pages2.forEach((p) => pdf2.addPage(p));

    /* -------- 5. PARALLEL SAVING -------- */
    // Serialize both PDFs to bytes concurrently
    const [pdfBytes1, pdfBytes2] = await Promise.all([
      pdf1.save(), 
      pdf2.save()
    ]);

    /* -------- 6. STREAMING RESPONSE (High Performance) -------- */
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="split_output_${Date.now()}.zip"`
    );

    // SPEED TWEAK: Use zlib Level 1 (Fastest) instead of 9 (Best compression)
    const archive = archiver("zip", { zlib: { level: 1 } });

    // Handle stream errors
    archive.on("error", (err) => {
      console.error("Archiver Error:", err);
      if (!res.headersSent) res.status(500).send({ error: "Archiving failed" });
    });

    // Pipe directly to response
    archive.pipe(res);

    // Append buffers with clear naming
    archive.append(Buffer.from(pdfBytes1), { name: `Part1_Pages_1-${splitAt}.pdf` });
    archive.append(Buffer.from(pdfBytes2), { name: `Part2_Pages_${splitAt + 1}-${totalPages}.pdf` });

    await archive.finalize();

  } catch (error) {
    console.error("PDF Split Error:", error);
    // Safety check: Don't try to send JSON if the zip stream has already started
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process PDF. Ensure the file is not encrypted/corrupt." });
    } else {
      res.end(); // Close the stream cleanly if it fails mid-way
    }
  }
};