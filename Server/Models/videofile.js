import mongoose from "mongoose"
const videofileschema=new mongoose.Schema(
    {
        videotitle: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
        filetype: {
          type: String,
          required: true,
        },
        filepath: {
          type: String,
          required: true,
        },
        filesize: {
          type: Number,
          required:true,
        },
        videochanel: {
          type: String,
          required: true,
        },
        Like: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        uploader:{
          type:String,
          required: true,
      },
        shares: {
          type: Number,
          default: 0, // Tracks the number of shares
        },
      },
      {
        timestamps: true, // Adds createdAt and updatedAt
      }
    );
export default mongoose.model("Videofiles",videofileschema)