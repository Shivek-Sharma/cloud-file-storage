const express = require('express');
const multer = require('multer');
const path = require('path');

const { s3Uploadv2 } = require('./s3Service')

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fileSize: 50000000, files: 1 } });

app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
    // console.log(req.file)

    const result = await s3Uploadv2(req.file);
    console.log(result.Location);

    res.json({ status: "success", body: result });
});

// Error Handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File is too large" });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({ message: "File limit reached" });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Unexpected file" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
});