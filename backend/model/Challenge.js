import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  points: { type: Number, default: 50 },
  criteria: { type: String, default: "log_3_activities_week" },
  active: { type: Boolean, default: true }
});

export default mongoose.model("Challenge", ChallengeSchema);
