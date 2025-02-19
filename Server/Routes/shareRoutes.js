import express from "express";
import { shareMultipleVideos, getSharedVideos, getReceivedVideos } from "../Controllers/share.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// ✅ Route to share multiple videos
router.post("/video/share/multiple", auth, (req, res) => shareMultipleVideos(req, res));;


// ✅ Route to get all shared videos (for sender's history)
router.get("/video/shared", auth, getSharedVideos);

// ✅ Route: Get received videos (for a specific receiver)
router.get("/video/received", auth, getReceivedVideos);

export default router;
