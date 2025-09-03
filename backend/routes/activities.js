import express from "express";
import Activity from "../models/Activity.js";
import EmissionFactor from "../models/EmissionFactor.js";
import { authRequired } from "../middleware/auth.js";
import { validate, schemas } from "../middleware/validation.js";

const router = express.Router();

async function computeEmission(category, subcategory, unit, quantity) {
  const ef = await EmissionFactor.findOne({ category, subcategory, unit });
  const factor = ef ? ef.factor : 0;
  return Number((quantity * factor).toFixed(3));
}

router.get("/", authRequired, async (req, res) => {
  const list = await Activity.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(list);
});

router.post("/", authRequired, validate(schemas.activity), async (req, res) => {
  const { category, subcategory, unit, quantity, date, notes } = req.body;
  const emission = await computeEmission(category, subcategory, unit, quantity);
  const act = await Activity.create({ user: req.userId, category, subcategory, unit, quantity, date, notes, emission });
  res.status(201).json(act);
});

router.put("/:id", authRequired, async (req, res) => {
  const a = await Activity.findOne({ _id: req.params.id, user: req.userId });
  if (!a) return res.status(404).json({ error: "Not found" });
  const upd = { ...req.body };
  if (upd.quantity || upd.unit || upd.category || upd.subcategory) {
    const cat = upd.category || a.category;
    const sub = upd.subcategory || a.subcategory;
    const unit = upd.unit || a.unit;
    const qty = upd.quantity || a.quantity;
    upd.emission = await computeEmission(cat, sub, unit, qty);
  }
  const saved = await Activity.findByIdAndUpdate(a._id, upd, { new: true });
  res.json(saved);
});

router.delete("/:id", authRequired, async (req, res) => {
  await Activity.deleteOne({ _id: req.params.id, user: req.userId });
  res.json({ ok: true });
});

export default router;
