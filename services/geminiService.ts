import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateTemplateContent = async (category: Category, userContext: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key not configured.";

  let systemPrompt = "";
  
  switch (category) {
    case Category.RESUME:
      systemPrompt = "You are an expert career coach. Generate a professional summary and 3 key bullet points for a resume based on the user's input.";
      break;
    case Category.BUSINESS_CARD:
      systemPrompt = "You are a branding expert. Suggest a catchy tagline and a job title description for a business card based on the user's input.";
      break;
    case Category.SOCIAL_MEDIA:
      systemPrompt = "You are a social media manager. Write an engaging caption with hashtags for the described post.";
      break;
    case Category.PROFESSIONAL_PHOTO:
      systemPrompt = "You are an expert photographer and prompt engineer. Create a highly detailed, photorealistic image generation prompt (for Midjourney or DALL-E) that would result in a professional photo described by the user. Include lighting, camera settings, and composition details.";
      break;
    default:
      systemPrompt = "You are a helpful creative assistant. Provide suggestions based on the user's input.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContext,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate content at this time. Please check your connection or API key.";
  }
};