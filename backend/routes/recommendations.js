import express from "express";
import Activity from "../models/Activity.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const acts = await Activity.find({ user: req.userId }).limit(50);
  const totals = acts.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + (a.emission || 0);
    return acc;
  }, {});
  const recs = [];
  if ((totals.transport || 0) > 10) recs.push("Consider public transit or carpool once a week.");
  if ((totals.energy || 0) > 10) recs.push("Switch to LED bulbs and unplug idle devices.");
  if ((totals.food || 0) > 10) recs.push("Try one meat-free day per week.");
  if ((totals.shopping || 0) > 5) recs.push("Buy durable or second-hand items where possible.");
  res.json({ totals, recs });
});

export default router;
