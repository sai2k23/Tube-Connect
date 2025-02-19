import Notification from "../Models/Notification.js";

// Fetch notifications for a user
export const getUserNotifications = async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        const notifications = await Notification.find({ receiverEmail: email }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};
