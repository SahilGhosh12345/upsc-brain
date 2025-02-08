
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateStudyPlan({ subject, availableHours, currentLevel, targetDate }) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Act as an experienced UPSC preparation mentor and create a detailed study plan based on the following information:
    
    Subject: ${subject}
    Available study hours per day: ${availableHours}
    Current preparation level: ${currentLevel}
    Target date: ${targetDate}

    Please provide a structured study plan that includes:
    1. Weekly breakdown of topics to cover
    2. Daily schedule with specific time slots
    3. Recommended resources and books
    4. Practice test schedule
    5. Revision strategy
    6. Important topics to focus on
    7. Tips for effective preparation

    Format the response in a clear, organized manner suitable for UPSC aspirants.
    Include specific measurable goals and milestones.
    Ensure the plan is realistic and achievable within the given timeframe.

    Important: 
    - Use minimal formatting
    - Avoid using asterisks, hashtags, or markdown
    - Use simple bullet points (•) for lists
    - Keep sections clearly separated
    - Use plain text formatting
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse and structure the response
    return {
      success: true,
      plan: text,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Error generating study plan:", error);
    return {
      success: false,
      error: "Failed to generate study plan. Please try again later.",
      timestamp: new Date().toISOString()
    };
  }
}