import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { subject } = await request.json();

    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Generate a UPSC level question for the subject: ${subject}

Please provide the response in the following JSON format:
{
  "question": "The actual question text",
  "expectedPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3",
    "Key point 4",
    "Key point 5"
  ],
  "maxWords": "Recommended word limit",
  "marks": "Total marks for this question"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the raw text content
    const text = response.text();

    // Clean the text by removing markdown code block indicators
    const cleanText = text.replace(/```json|```/g, '').trim();

    // Parse the cleaned text into JSON
    const questionData = JSON.parse(cleanText);

    return NextResponse.json({
      success: true,
      data: questionData
    });

  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate question. Please try again.'
      },
      { status: 500 }
    );
  }
}
