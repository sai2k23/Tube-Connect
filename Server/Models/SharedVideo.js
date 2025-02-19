import mongoose from "mongoose";

const SharedVideoSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    title: { type: String, required: true },
    filepath: { type: String, required: true },
    uploader: { type: String, required: true },
    sharedBy: { type: String, required: true },
    receiverEmail: { type: String, required: true }, // ✅ Added recipient email
    message: { type: String }, // ✅ Optional message field
  },
  { timestamps: true }
);

export default mongoose.model("SharedVideo", SharedVideoSchema);
