
'use server';

/**
 * @fileOverview Provides a flow to find nearby sports training centers.
 * 
 * - findNearbyCenters - A function that finds training centers for a given sport and location.
 * - FindNearbyCentersInput - The input type for the findNearbyCenters function.
 * - FindNearbyCentersOutput - The return type for the findNearbyCenters function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindNearbyCentersInputSchema = z.object({
  sport: z.string().describe('The sport for which to find training centers.'),
  location: z.string().describe('The user\'s current location (e.g., city, zip code).'),
});
export type FindNearbyCentersInput = z.infer<typeof FindNearbyCentersInputSchema>;

const FindNearbyCentersOutputSchema = z.object({
  centers: z.array(z.object({
    name: z.string().describe('The name of the training center.'),
    address: z.string().describe('The address of the training center.'),
    description: z.string().describe('A brief description of the center and its offerings.'),
  })).describe('A list of plausible but fictional nearby training centers.'),
});
export type FindNearbyCentersOutput = z.infer<typeof FindNearbyCentersOutputSchema>;

export async function findNearbyCenters(input: FindNearbyCentersInput): Promise<FindNearbyCentersOutput> {
  return findNearbyCentersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findNearbyCentersPrompt',
  input: { schema: FindNearbyCentersInputSchema },
  output: { schema: FindNearbyCentersOutputSchema },
  prompt: `You are a sports directory assistant. Your task is to find training centers for a specific sport near the user's provided location.

Generate a list of 3 to 5 plausible but fictional training centers. For each center, provide a realistic name, address, and a short description of its programs.

Sport: {{{sport}}}
Location: {{{location}}}
`,
});

const findNearbyCentersFlow = ai.defineFlow(
  {
    name: 'findNearbyCentersFlow',
    inputSchema: FindNearbyCentersInputSchema,
    outputSchema: FindNearbyCentersOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
