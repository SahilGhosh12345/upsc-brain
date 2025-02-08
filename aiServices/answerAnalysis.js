import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Function to extract text from an image using OCR
async function extractTextFromImage(imageBase64) {
  try {
    // Ensure base64 is correctly formatted
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    
    const { data: { text } } = await Tesseract.recognize(
      `data:image/png;base64,${base64Data}`,
      'eng',
      { logger: m => console.log(m) } // Optional logging
    );

    return text.trim();
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
}

// Function to analyze a student's answer
async function analyzeAnswer({ 
  userAnswer, 
  questionText, 
  subject, 
  expectedPoints, 
  isImage = false,
  imageData = null 
}) {
  try {
    let answerText = userAnswer;
    
    // Extract text from image if needed
    if (isImage && imageData) {
      console.log("Extracting text from image...");
      answerText = await extractTextFromImage(imageData);
    }

    // Check if extracted text is empty
    if (!answerText || answerText.trim() === "") {
      throw new Error("Extracted text is empty or unreadable.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    Act as an experienced UPSC examiner and provide a detailed analysis of the following answer:

    Question: ${questionText}
    Subject: ${subject}
    Expected Key Points: ${expectedPoints}
    Student's Answer: ${answerText}

    Please provide a comprehensive analysis in the following format:

    1. CONTENT ANALYSIS
    • Coverage of key points
    • Accuracy of information
    • Relevance to the question
    • Use of examples and facts

    2. STRUCTURE AND PRESENTATION
    • Introduction effectiveness
    • Logical flow
    • Conclusion strength
    • Paragraph organization

    3. STRENGTHS
    • List main strong points

    4. AREAS FOR IMPROVEMENT
    • List specific areas needing improvement

    5. SPECIFIC SUGGESTIONS
    • Actionable recommendations

    6. SCORE AND RATING
    • Provide a score out of 10
    • Brief justification for the score

    Format Guidelines:
    - Use clear, constructive language
    - Be specific in feedback
    - Provide actionable suggestions
    - Highlight both positive and negative aspects
    - Keep formatting minimal and clean
    `;

    console.log("Generating analysis...");
    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error("No valid response from Gemini API.");
    }

    const responseText = await result.response.text();

    // Format response for better readability
    const formattedResponse = responseText
      .replace(/#{1,}/g, '')  // Remove hashtags
      .replace(/\*{2,}/g, '*') // Replace multiple asterisks with single
      .replace(/\n{3,}/g, '\n\n') // Clean up excessive newlines
      .trim();

    return {
      success: true,
      analysis: formattedResponse,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error analyzing answer:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze answer. Please try again.",
      timestamp: new Date().toISOString()
    };
  }
}

export { analyzeAnswer };
