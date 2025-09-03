import express from "express";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authRequired, async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash");
  res.json(user);
});

export default router;
