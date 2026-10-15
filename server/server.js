
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/feedback")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB error:", err.message));

const feedbackSchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/api/feedback", async (req, res) => {
  try {
    await Feedback.create(req.body);
    res.status(201).json({
      message: "Feedback submitted successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
