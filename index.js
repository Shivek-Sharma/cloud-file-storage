const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { s3Uploadv2 } = require('./services/s3Service');
const userRoute = require('./routes/user');
const { checkForAuthCookie } = require('./middlewares/authentication');
const ShortUrl = require('./models/shortUrl');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/d/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl == null) return res.redirect("/upload");

    res.redirect(shortUrl.full);
});

app.use("/user", userRoute);

// setting up multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 50000000, files: 1 } });

app.get("/upload", async (req, res) => {
    const shortUrls = await ShortUrl.find({ createdBy: req.user._id });

    if (shortUrls.length > 0) {
        return res.render("home", { user: req.user, shortUrls });
    }

    res.render("home", { user: req.user });
});

app.post("/upload", upload.single("file"), async (req, res) => {
    // console.log(req.file)
    const fileName = req.file.originalname;

    const result = await s3Uploadv2(req.file);
    // console.log(result)
    const objectUrl = result.Location;

    await ShortUrl.create({
        full: objectUrl,
        fileName,
        createdBy: req.user._id
    });

    res.redirect("/upload");
});

// Error Handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            res.render("home", { user: req.user, error: "File is too large" });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            res.render("home", { user: req.user, error: "Unexpected file" });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
});