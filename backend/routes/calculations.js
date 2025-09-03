import express from "express";
import EmissionFactor from "../models/EmissionFactor.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.post("/estimate", authRequired, async (req, res) => {
  const { category, subcategory, unit, quantity } = req.body;
  const ef = await EmissionFactor.findOne({ category, subcategory, unit });
  const factor = ef ? ef.factor : 0;
  const emission = Number((quantity * factor).toFixed(3));
  res.json({ emission, factor });
});

export default router;
