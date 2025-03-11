import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    // Parse the request body
    const { message } = await request.json();

    // Validate the message
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt
    const prompt = `You are an AI chatbot designed to help people with coding and problem-solving. Respond in a conversational tone. The user's request is: ${message}`;

    // Generate the AI response
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim();

    console.log("AI Response:", aiResponse); // Debugging log

    // Return the AI response
    return NextResponse.json({ aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error.message || error); // Debugging log
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}