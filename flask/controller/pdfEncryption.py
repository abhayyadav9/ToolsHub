from pypdf import PdfReader, PdfWriter
import io

def encrypt_pdf_file(pdf_file, password):
    """
    Encrypt a PDF with a user password (AES-256)
    Returns BytesIO object
    """

    reader = PdfReader(pdf_file)
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    writer.encrypt(
        user_password=password,
        owner_password=None,
        use_128bit=False  # AES-256
    )

    output = io.BytesIO()
    writer.write(output)
    output.seek(0)

    return output






def decrypt_pdf_file(pdf_file, password):
    """
    Decrypt a password-protected PDF and return unlocked PDF
    """

    reader = PdfReader(pdf_file)

    if reader.is_encrypted:
        if not reader.decrypt(password):
            raise ValueError("Incorrect password")

    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    output = io.BytesIO()
    writer.write(output)
    output.seek(0)

    return output
