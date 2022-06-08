const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},

    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;