import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, enum: ["transport", "energy", "food", "shopping"], required: true },
  subcategory: { type: String },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, default: Date.now },
  emission: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model("Activity", ActivitySchema);
