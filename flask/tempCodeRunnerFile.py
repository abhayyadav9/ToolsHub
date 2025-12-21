@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    try:
        input_image = Image.open(file.stream).convert("RGBA")
        output_image = remove(input_image)

        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        response = send_file(
            img_io,
            mimetype="image/png",
            as_attachment=True,
            download_name="bg-removed.png"
        )

        # ✅ REQUIRED CORS HEADERS
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"

        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 500
