import axios from "axios";

const API_KEY = "XXX"; // Replace with your API Key
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = "You are a fun, interactive, plying, and concise AI. Keep responses short, engaging, and to the point. also use emoji and only give reply related to health other that is strictly prohibted";

// Function to send a message to Gemini AI
export const askGemini = async (userMessage,exerciseName) => {
  try {
    const systemPrompt = `${SYSTEM_PROMPT}\nExercise Name: ${exerciseName}`;
    console.log(systemPrompt);
    const response = await axios.post(GEMINI_URL, {
      contents: [
        { role: "user", parts: [{ text: systemPrompt}] },
        { role: "user", parts: [{ text: userMessage }] }
      ]
    });

    // Extract AI's response
    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return aiResponse;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Sorry, something went wrong.";
  }
};
