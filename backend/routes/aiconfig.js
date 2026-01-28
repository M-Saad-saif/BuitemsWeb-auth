const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate-text", async (req, res) => {
  const { text } = req.body;
  let prompt = "";

  prompt = `${text}...explain in detail, easy wording which clear the concept`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.json({
      success: true,
      result: response.choices[0].message.content || "",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Cannot Answer due to server issue",
      message: error.message,
    });
  }
});

module.exports = router