import mongoose from "mongoose";
import User from "./User";
const { Schema } = mongoose;
const noteSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now 
    },
    updated_date: {
        type: Date,
        default: Date.now 
    },
    archived:{
        type: Boolean,
        default: false
    },
    trashed:{
        type: Boolean,
        default: false
    }
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
