import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    ipl: {
        type: String,
        default: "",
    },
    });

const User = mongoose.model('FulltossUser', userSchema);

export default User;