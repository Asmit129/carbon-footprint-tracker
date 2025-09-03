import express from "express";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/leaderboard", async (_req, res) => {
  const top = await User.find().sort({ points: -1 }).limit(10).select("name points badges");
  res.json(top);
});

router.post("/award", authRequired, async (req, res) => {
  // Simple rule: +10 points per activity logged today
  const today = new Date(); today.setHours(0,0,0,0);
  const count = await Activity.countDocuments({ user: req.userId, createdAt: { $gte: today } });
  const user = await User.findById(req.userId);
  const add = count * 10;
  user.points += add;
  if (user.points >= 100 && !user.badges.find(b => b.name === "Century")) {
    user.badges.push({ name: "Century" });
  }
  await user.save();
  res.json({ points: user.points, badges: user.badges });
});

export default router;
