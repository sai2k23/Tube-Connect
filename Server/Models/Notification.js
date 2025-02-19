import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientEmail: { type: String, required: true }, // ✅ Store email instead of ObjectId
    senderEmail: { type: String, required: true },
    videoTitle: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
