import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
  name: String,
  earnedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  points: { type: Number, default: 0 },
  badges: { type: [BadgeSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
