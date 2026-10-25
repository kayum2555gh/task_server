const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{timestamps:true},
);

const userModel = mongoose.model("users", userShcema);

module.exports = userModel;