import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  unit: { type: String, required: true },
  factor: { type: Number, required: true } // kg CO2e per unit
});

EmissionFactorSchema.index({ category: 1, subcategory: 1, unit: 1 }, { unique: true });

export default mongoose.model("EmissionFactor", EmissionFactorSchema);
