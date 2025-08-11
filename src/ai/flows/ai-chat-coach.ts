'use server';

/**
 * @fileOverview Provides an AI Chat Coach for answering sport-specific questions.
 *
 * - aiChatCoach - A function that answers sport-specific questions.
 * - AiChatCoachInput - The input type for the aiChatCoach function.
 * - AiChatCoachOutput - The return type for the aiChatCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatCoachInputSchema = z.object({
  sport: z.string().describe('The sport the user is asking about.'),
  question: z.string().describe('The sport-specific question the user is asking.'),
});
export type AiChatCoachInput = z.infer<typeof AiChatCoachInputSchema>;

const AiChatCoachOutputSchema = z.object({
  answer: z.string().describe("The answer to the user's sport-specific question."),
   drills: z.array(z.object({
    name: z.string().describe("The name of the practice drill."),
    description: z.string().describe("A brief description of how to perform the drill.")
  })).optional().describe("A list of practice drills to help the user improve, if their question was about skill improvement.")
});
export type AiChatCoachOutput = z.infer<typeof AiChatCoachOutputSchema>;

export async function aiChatCoach(input: AiChatCoachInput): Promise<AiChatCoachOutput> {
  return aiChatCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatCoachPrompt',
  input: {schema: AiChatCoachInputSchema},
  output: {schema: AiChatCoachOutputSchema},
  prompt: `You are a sports expert AI Chat Coach specializing in answering questions about various sports.

You will use your knowledge to answer the user's question about the sport they have selected.

If the user's question is about improving a specific skill, provide a few practice drills in your answer.

Sport: {{{sport}}}
Question: {{{question}}}

Answer:`,
});

const aiChatCoachFlow = ai.defineFlow(
  {
    name: 'aiChatCoachFlow',
    inputSchema: AiChatCoachInputSchema,
    outputSchema: AiChatCoachOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
