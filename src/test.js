import express from "express";
import mongoose from "mongoose";
import User from "../db/User.model.js";

const app = express();
app.use(express.json()); // ✅ added ()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("DB Connection Error ❌:", err.message);
    process.exit(1);
  }
};

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

connectDB().then(() => {
  app.listen(3000, () => console.log("🚀 Server running on port 3000"));
});
