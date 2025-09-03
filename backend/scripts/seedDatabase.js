import dotenv from "dotenv";
import mongoose from "mongoose";
import EmissionFactor from "../models/EmissionFactor.js";
import Challenge from "../models/Challenge.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/carbon";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected. Seeding...");

  const factors = [
    { category: "transport", subcategory: "car_petrol", unit: "km", factor: 0.192 },
    { category: "transport", subcategory: "bus", unit: "km", factor: 0.082 },
    { category: "transport", subcategory: "train", unit: "km", factor: 0.041 },
    { category: "energy", subcategory: "electricity_in", unit: "kWh", factor: 0.708 },
    { category: "food", subcategory: "beef", unit: "kg", factor: 27.0 },
    { category: "food", subcategory: "vegetables", unit: "kg", factor: 2.0 },
    { category: "shopping", subcategory: "clothing", unit: "usd", factor: 0.6 }
  ];

  const challenges = [
    { title: "Log 3 Activities This Week", description: "Build a habit!", points: 50 },
    { title: "Public Transit Day", description: "Skip driving once.", points: 30 }
  ];

  await EmissionFactor.deleteMany({});
  await Challenge.deleteMany({});
  await EmissionFactor.insertMany(factors);
  await Challenge.insertMany(challenges);
  console.log("Seeded factors and challenges.");
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
