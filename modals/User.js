import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    tel_id: {
        type: Number,
        required: false
    },
    user_name: {
        type: String,
        required: true,
        default: "NOTHING",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_name:{
        type: String,
        required: true,
        default: "NOTHING",
    },
    mobile:{
        type: String,
        required: true,
        default: "NOTHING",
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
