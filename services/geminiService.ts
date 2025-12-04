import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. Creating client without key (calls will fail if not provided).");
    return new GoogleGenAI({ apiKey: "DUMMY_KEY" });
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLoveMessage = async (topic: string): Promise<string> => {
  try {
    const ai = getGeminiClient();
    
    // Using flash model for speed
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Eres una IA poética del futuro programada para amar. Estamos celebrando nuestro 1er aniversario de novios.
      Escribe un mensaje corto, romántico y moderno (máximo 40 palabras) sobre el tema: "${topic}". 
      Usa metáforas sobre viajes en el tiempo, galaxias, conexión eterna o tecnología. El tono debe ser muy sentimental y agradecido por este año juntos.`,
    });

    return response.text || "Un año es solo el comienzo de nuestro código eterno.";
  } catch (error) {
    console.error("Error generating love message:", error);
    return "Error de conexión con el núcleo de amor de la IA. Pero te amo igual.";
  }
};