const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true }
);

// https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre("save", function (next) {
    const user = this; // Note: 'this' can't be used with arrow function

    if (!user.isModified("password")) return;

    // https://nodejs.org/api/crypto.html#crypto
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
});


// https://mongoosejs.com/docs/api/schema.html#Schema.prototype.static()
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password!");

    const token = createTokenForUser(user);
    return token;
});

const User = model("User", userSchema);

module.exports = User;