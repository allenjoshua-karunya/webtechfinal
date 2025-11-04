import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "admin",
      password: hashed,
      role: "admin"
    });

    console.log("Admin created: username=admin password=admin123");
    process.exit();
  })
  .catch(err => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });
