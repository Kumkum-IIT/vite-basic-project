const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const uri = ""


app.use(cors(corsOptions));
app.use(express.json());

// Create a schema for quiz questions
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, required: true },
  optionD: { type: String, required: true },
  selectedAnswer: { type: String, required: true }
});

// Create a model from the schema
const Question = mongoose.model('Question', questionSchema);

// New endpoint to save quiz questions
app.post("/api/questions", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(400).json({ message: "Error adding question", error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
    }
  }
  
connect();