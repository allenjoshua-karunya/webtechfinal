import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import animalRoutes from "./routes/animals.js";
import adoptionRoutes from "./routes/adoptions.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FurEverHome API is running...");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/adoptions", adoptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
