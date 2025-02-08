import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateContent(topic) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Provide a comprehensive, exam-focused response about "${topic}" tailored for UPSC preparation, structured as follows:

Brief Overview

Capture the core essence of the topic in 2-3 crisp, informative sentences
Emphasize historical, contemporary, or conceptual significance relevant to UPSC syllabus
Ensure clarity and directness


Key Points

Generate 4-5 substantive bullet points
Include:
a. Historical context or origin
b. Current relevance or contemporary implications
c. Multidimensional perspectives (political, social, economic, or strategic)
d. Government initiatives or policy frameworks
e. Potential exam-oriented insights or analytical angles


Potential UPSC Examination Approach

Highlight 2-3 potential question types
Suggest critical areas of focus for answer writing
Indicate interdisciplinary connections


Summary

Synthesize the topic's core understanding
Provide a forward-looking perspective



Additional Guidelines:

Maintain academic rigor and objectivity
Use precise, technical language
Avoid jargon unless necessary
Prioritize factual information
Ensure content is current and aligned with latest UPSC trends
Length: 250-350 words
Language: Clear, concise, and examination-oriented

Constraints:

No markdown formatting
No unnecessary introductions
No decorative language
Focus on substantive content`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const unformattedText = response.text();
    return unformattedText.replaceAll('**', '');
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error.message || 'Failed to generate content');
  }
}