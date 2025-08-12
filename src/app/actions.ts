
"use server";

import { aiChatCoach, type AiChatCoachInput, type AiChatCoachOutput } from "@/ai/flows/ai-chat-coach";
import { findNearbyCenters, type FindNearbyCentersInput, type FindNearbyCentersOutput } from "@/ai/flows/find-nearby-centers";

export async function getAiCoachResponse(input: AiChatCoachInput): Promise<{ success: true, data: AiChatCoachOutput } | { success: false, error: string }> {
  try {
    const result = await aiChatCoach(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get response from AI coach. Please try again." };
  }
}

export async function getNearbyCenters(input: FindNearbyCentersInput): Promise<{ success: true, data: FindNearbyCentersOutput } | { success: false, error: string }> {
    try {
        const result = await findNearbyCenters(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to find nearby centers. Please try again." };
    }
}
