import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Category } from '../types';

const getClient = () => {
  // Access process.env.API_KEY directly as per guidelines.
  // We assume the environment is correctly polyfilled or configured.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing from process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateTemplateContent = async (category: Category, userContext: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Configuration Error: API Key is missing. Please ensure process.env.API_KEY is set.";

  let systemPrompt = "You are a helpful creative assistant. Provide suggestions based on the user's input.";
  
  switch (category) {
    case Category.RESUME:
      systemPrompt = "You are an expert career coach. Generate a professional summary and 3 key bullet points for a resume based on the user's input. Keep it professional and concise.";
      break;
    case Category.BUSINESS_CARD:
      systemPrompt = "You are a branding expert. Suggest a catchy tagline and a job title description for a business card based on the user's input. Keep it short and impactful.";
      break;
    case Category.SOCIAL_MEDIA:
      systemPrompt = "You are a social media manager. Write an engaging caption with hashtags for the described post. Include emojis where appropriate.";
      break;
    case Category.PROFESSIONAL_PHOTO:
      systemPrompt = "You are an expert photographer and prompt engineer. Create a highly detailed, photorealistic image generation prompt (for Midjourney or DALL-E) that would result in a professional photo described by the user. Include lighting, camera settings, and composition details.";
      break;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContext,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Access the text property directly from the response object
    if (response.text) {
      return response.text;
    }
    
    return "The AI generated a response but it contained no text. Please try refining your request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a user-friendly error message
    return "Sorry, I encountered an issue connecting to the AI service. Please check your internet connection and try again.";
  }
};
