
"use server";

import { aiChatCoach, type AiChatCoachInput, type AiChatCoachOutput } from "@/ai/flows/ai-chat-coach";
import { generateImage, type GenerateImageInput, type GenerateImageOutput } from "@/ai/flows/image-generator";

export async function getAiCoachResponse(input: AiChatCoachInput): Promise<{ success: true, data: AiChatCoachOutput } | { success: false, error: string }> {
  try {
    const result = await aiChatCoach(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get response from AI coach. Please try again." };
  }
}

export async function getAiImage(input: GenerateImageInput): Promise<{ success: true, data: GenerateImageOutput } | { success: false, error: string }> {
  try {
    const result = await generateImage(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate image. Please try again." };
  }
}
