const { Schema, model } = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    fileName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true }
);

const ShortUrl = model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;