import { GoogleGenAI, Type } from "@google/genai";
import type { Therapist } from '../types';

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The full name of the therapist or clinic.",
      },
      specialty: {
        type: Type.STRING,
        description: "The primary specialty, e.g., 'Cognitive Behavioral Therapy', 'Family Counseling'.",
      },
      address: {
        type: Type.STRING,
        description: "The complete street address.",
      },
      phone: {
        type: Type.STRING,
        description: "The contact phone number, formatted as (XXX) XXX-XXXX.",
      },
    },
    required: ["name", "specialty", "address", "phone"],
  },
};

export async function findTherapists(zipcode: string): Promise<Therapist[]> {
  // Initialize the client inside the function to ensure the most up-to-date API key is used for every request.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `Find 5-7 licensed therapists or mental health clinics in the zipcode ${zipcode}. Provide their name, a primary specialty, full address, and phone number.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text.trim();
    if (!jsonText) {
      console.warn("Gemini API returned an empty response.");
      return [];
    }
    
    const therapists = JSON.parse(jsonText) as Therapist[];
    return therapists;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    // Rethrow to be caught by the calling function in App.tsx
    throw new Error("Failed to communicate with the AI service.");
  }
}
