import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js"; // Import Tesseract.js for OCR
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { 
      questionText, 
      expectedPoints, 
      userAnswer, 
      answerType,
      imageData,
      subject,
      maxWords,
      marks 
    } = await request.json();

    let answerText = userAnswer;

    // Handle image-based answer using Tesseract.js OCR
    if (answerType === "image" && imageData) {
      try {
        const { data: { text } } = await Tesseract.recognize(
          imageData,  // Base64 or image URL
          "eng",      // English language OCR
          { logger: (m) => console.log(m) } // Log OCR progress
        );

        answerText = text.trim().replace(/\s+/g, " "); // Clean extracted text
        console.log("Extracted Text:", answerText);

        // Handle cases where OCR fails
        if (!answerText || answerText.length < 5) {
          answerText = "OCR failed to extract text correctly.";
        }
      } catch (error) {
        console.error("Tesseract OCR Error:", error);
        answerText = "Error processing image text.";
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an experienced UPSC examiner. Please analyze the student's answer carefully. 

    *Question:* ${questionText}  
    *Subject:* ${subject}  
    *Expected Key Points:* ${JSON.stringify(expectedPoints)}  
    *Maximum Words:* ${maxWords}  
    *Total Marks:* ${marks}  

    *Student's Answer (Extracted from Image or Text):*  
    ${answerText}

    🔹 *Task:*  
    1. Evaluate the student's answer for accuracy, completeness, and relevance.
    2. If the answer is incorrect or incomplete, provide the *correct answer*.
    3. Highlight key strengths and areas for improvement.
    4. Provide a final *score out of ${marks}*, with justification.
    
    Respond in a detailed but natural paragraph format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Extract score using regex (e.g., "Score: X/marks")
    const scoreMatch = analysisText.match(/Score:\s*(\d+)\/\d+/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : "Not provided";

    return NextResponse.json({
      success: true,
      analysis: analysisText.trim(), // AI response in paragraph format
      score: score // Ensure score is always returned
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze answer. Please try again."
      },
      { status: 500 }
    );
  }
}
