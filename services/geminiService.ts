
import { GoogleGenAI } from "@google/genai";

export const generateWorkflowPreview = async (scenario: string): Promise<string> => {
  // Fixed: Following guidelines to assume process.env.API_KEY is pre-configured and accessible.
  // Fixed: Using gemini-3-pro-preview for complex text tasks (automated reasoning and workflow design).
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are DeepflowAI, an automation engine for joiners and fitters. 
      The user (a joiner) has input this scenario: "${scenario}".
      
      Output a 3-step automated workflow that would handle this. 
      Then, draft a short, professional, plain-text email that the system would prepare for the joiner to review and send.
      Keep it practical, no fluff, "engineered" tone.
      Format with Markdown bullet points and bold headings.`,
    });

    return response.text || "System could not generate a preview at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating preview. Please ensure the system is properly configured and try again.";
  }
};
