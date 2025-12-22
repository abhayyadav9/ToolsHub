from PIL import Image
import io

def images_to_pdf(image_files):
    """
    Convert multiple images to a single high-quality PDF
    """

    images = []

    for file in image_files:
        img = Image.open(file.stream)

        # Convert all images to RGB (PDF requirement)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        images.append(img)

    if not images:
        raise ValueError("No images provided")

    pdf_bytes = io.BytesIO()

    # Save first image and append others
    images[0].save(
        pdf_bytes,
        format="PDF",
        resolution=300.0,
        save_all=True,
        append_images=images[1:]
    )

    pdf_bytes.seek(0)
    return pdf_bytes
