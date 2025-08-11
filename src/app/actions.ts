"use server";

import { aiChatCoach, type AiChatCoachInput } from "@/ai/flows/ai-chat-coach";

export async function getAiCoachResponse(input: AiChatCoachInput) {
  try {
    const result = await aiChatCoach(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get response from AI coach. Please try again." };
  }
}
