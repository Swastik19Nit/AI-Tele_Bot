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
        type: Schema.Types.Mixed,
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
    imageUrl:{
         type: String
    },
    archived: {
        type: Boolean,
        default: false
    },
    trashed: {
        type: Boolean,
        default: false
    },
    remind_date:{
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
