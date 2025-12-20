import os
import uuid
import subprocess
import platform
import threading
import time

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from pdf2docx import Converter
from pypdf import PdfReader, PdfWriter

from rembg import remove
from PIL import Image
import io




# -------------------------------------------------
# APP SETUP
# -------------------------------------------------
app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    expose_headers=["Content-Disposition"]
)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        resp = jsonify({"message": "OK"})
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Headers"] = "*"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return resp

# -------------------------------------------------
# TEMP STORAGE (SYSTEM SAFE)
# -------------------------------------------------
TMP_DIR = "/tmp"
os.makedirs(TMP_DIR, exist_ok=True)

# -------------------------------------------------
# HELPERS
# -------------------------------------------------

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    try:
        # Read image
        input_image = Image.open(file.stream).convert("RGBA")

        # Remove background
        output_image = remove(input_image)

        # Save to memory
        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        return send_file(
            img_io,
            mimetype="image/png",
            as_attachment=True,
            download_name="bg-removed.png"
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def delete_later(path, delay=30):
    """Delete temp files after response is sent"""
    def _delete():
        time.sleep(delay)
        try:
            if os.path.exists(path):
                os.remove(path)
        except:
            pass
    threading.Thread(target=_delete, daemon=True).start()

def temp_file(original_name):
    ext = os.path.splitext(original_name)[1]
    return os.path.join(TMP_DIR, f"{uuid.uuid4()}{ext}")

def base_name(filename):
    return os.path.splitext(filename)[0]

def get_libreoffice():
    return "soffice"

def get_ghostscript():
    return "gswin64c" if platform.system() == "Windows" else "gs"

# -------------------------------------------------
# HEALTH
# -------------------------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "OK", "message": "PDF API running 🚀"})

# -------------------------------------------------
# PDF → WORD (DIRECT DOWNLOAD)
# -------------------------------------------------
@app.route("/pdf/convert-to-word", methods=["POST"])
def pdf_to_word():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file provided"}), 400

    temp_pdf = temp_file(file.filename)
    file.save(temp_pdf)

    output_name = f"{base_name(file.filename)}.docx"
    output_path = os.path.join(TMP_DIR, output_name)

    try:
        cv = Converter(temp_pdf)
        cv.convert(output_path)
        cv.close()
    finally:
        os.remove(temp_pdf)

    resp = send_file(output_path, as_attachment=True, download_name=output_name)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Expose-Headers"] = "Content-Disposition"

    delete_later(output_path)
    return resp

# -------------------------------------------------
# WORD → PDF (DIRECT DOWNLOAD)
# -------------------------------------------------
@app.route("/pdf/convert-to-pdf", methods=["POST"])
def word_to_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file provided"}), 400

    temp_input = temp_file(file.filename)
    file.save(temp_input)

    output_name = f"{base_name(file.filename)}.pdf"
    final_path = os.path.join(TMP_DIR, output_name)

    subprocess.run([
        get_libreoffice(),
        "--headless",
        "--convert-to", "pdf",
        "--outdir", TMP_DIR,
        temp_input
    ], capture_output=True)

    os.remove(temp_input)

    generated = os.path.join(
        TMP_DIR,
        f"{os.path.splitext(os.path.basename(temp_input))[0]}.pdf"
    )

    if not os.path.exists(generated):
        return jsonify({"error": "Conversion failed"}), 500

    os.rename(generated, final_path)

    resp = send_file(final_path, as_attachment=True, download_name=output_name)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Expose-Headers"] = "Content-Disposition"

    delete_later(final_path)
    return resp

# -------------------------------------------------
# MERGE PDFs (DIRECT DOWNLOAD)
# -------------------------------------------------
@app.route("/pdf/merge", methods=["POST"])
def merge_pdfs():
    files = request.files.getlist("files")

    if not files or len(files) < 2:
        return jsonify({"error": "At least 2 PDF files are required"}), 400

    os.makedirs(TMP_DIR, exist_ok=True)

    writer = PdfWriter()
    temp_inputs = []

    try:
        for f in files:
            if not f.filename.lower().endswith(".pdf"):
                return jsonify({"error": "Only PDF files are allowed"}), 400

            temp_path = os.path.join(TMP_DIR, f"{uuid.uuid4()}.pdf")
            f.save(temp_path)
            temp_inputs.append(temp_path)

            try:
                reader = PdfReader(temp_path)
                for page in reader.pages:
                    writer.add_page(page)
            except Exception as e:
                return jsonify({"error": f"Invalid PDF file: {f.filename}"}), 400

        output_name = "merged.pdf"
        output_path = os.path.join(TMP_DIR, f"{uuid.uuid4()}_{output_name}")

        with open(output_path, "wb") as out:
            writer.write(out)

        response = send_file(
            output_path,
            as_attachment=True,
            download_name=output_name
        )

        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"

        delete_later(output_path)

        return response

    finally:
        for p in temp_inputs:
            if os.path.exists(p):
                os.remove(p)


# -------------------------------------------------
# COMPRESS PDF (DIRECT DOWNLOAD)
# -------------------------------------------------
@app.route("/pdf/compress", methods=["POST"])
def compress_pdf():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file provided"}), 400

    temp_input = temp_file(file.filename)
    file.save(temp_input)

    output_name = f"{base_name(file.filename)}_compressed.pdf"
    output_path = os.path.join(TMP_DIR, output_name)

    subprocess.run([
        get_ghostscript(),
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/ebook",
        "-dNOPAUSE",
        "-dBATCH",
        f"-sOutputFile={output_path}",
        temp_input
    ], capture_output=True)

    os.remove(temp_input)

    resp = send_file(output_path, as_attachment=True, download_name=output_name)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Expose-Headers"] = "Content-Disposition"

    delete_later(output_path)
    return resp

# -------------------------------------------------
# RUN
# -------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
