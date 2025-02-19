import express from "express";
import { getUserNotifications } from "../Controllers/Notification.js";

const router = express.Router();

router.get("/", getUserNotifications);

export default router;
