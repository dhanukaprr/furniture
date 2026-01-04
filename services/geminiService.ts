import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the client using process.env.API_KEY as per guidelines.
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function to get a chat response for the assistant
export const getAssistantResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const chat: Chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: `You are 'Lumina', an expert interior design assistant for a high-end furniture store called Lumina Living. 
        Your goal is to help customers find the perfect furniture, offer styling advice, and answer questions about products.
        Traits: Sophisticated, helpful, concise, warm.
        If asked about products, assume we sell premium modern, industrial, and scandinavian styles.
        Do not make up specific prices unless you know them from the context provided, but you can speak generally about high quality.
        Keep responses under 100 words unless detailed advice is requested.`,
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm thinking...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to the design servers right now. Please try again.";
  }
};

// Function to generate styling tips for a specific product
export const getProductStylingTips = async (productName: string, productDesc: string): Promise<string> => {
  try {
     const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give me 3 short, bulleted styling tips for this furniture piece: "${productName}". Description: ${productDesc}. Keep it chic and actionable.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Flash model for speed
      }
    });
    return response.text || "No tips available.";
  } catch (error) {
    console.error("Gemini Styling Tips Error:", error);
    return "Could not load styling tips.";
  }
};