// Default'
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

export async function askQuestion(req, res) {
  try {
    const { question } = req.body;

    if (!question) {
      throw new Error("please ask question properly..");
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_SECRET,
    });

    await groq.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You are a math expert and here is my question please response this ${question} in detail`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      })
      .then((chatCompletion) => {
        const response = chatCompletion.choices[0]?.message?.content || "";

        res.status(200).json({
          success: true,
          response,
          message: "fetched data successfully",
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Data not fetched successfully",
    });
  }
}
