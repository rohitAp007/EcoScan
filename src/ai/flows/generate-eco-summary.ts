'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an eco-friendly summary of a product and alternative recommendations.
 *
 * - generateEcoSummary - A function that takes a product name and eco-score and returns a summary of its environmental impact and eco-friendly alternatives.
 * - GenerateEcoSummaryInput - The input type for the generateEcoSummary function.
 * - GenerateEcoSummaryOutput - The return type for the generateEcoSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEcoSummaryInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  ecoScore: z.string().describe('The eco-score of the product (A, B, C, D, E, or F).'),
});
export type GenerateEcoSummaryInput = z.infer<typeof GenerateEcoSummaryInputSchema>;

const GenerateEcoSummaryOutputSchema = z.object({
  summary: z.string().optional().describe('A summary of the product\'s environmental impact, displayed only if the impact is high.'),
  recommendations: z.string().optional().describe('Alternative eco-friendly product recommendations, displayed only if they exist.'),
});
export type GenerateEcoSummaryOutput = z.infer<typeof GenerateEcoSummaryOutputSchema>;

export async function generateEcoSummary(input: GenerateEcoSummaryInput): Promise<GenerateEcoSummaryOutput> {
  return generateEcoSummaryFlow(input);
}

const generateEcoSummaryPrompt = ai.definePrompt({
  name: 'generateEcoSummaryPrompt',
  input: {schema: GenerateEcoSummaryInputSchema},
  output: {schema: GenerateEcoSummaryOutputSchema},
  prompt: `You are an AI assistant designed to provide users with information about the environmental impact of products.

  Given the product name "{{productName}}" and its Eco-Score "{{ecoScore}}", generate a concise summary of the product's environmental impact. Only provide the summary if the Eco-Score indicates a high environmental impact (D, E, or F).

  If there are readily available eco-friendly alternatives to the product, provide a short list of recommendations. Display the recommendations only if they exist.
  `,
});

const generateEcoSummaryFlow = ai.defineFlow(
  {
    name: 'generateEcoSummaryFlow',
    inputSchema: GenerateEcoSummaryInputSchema,
    outputSchema: GenerateEcoSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateEcoSummaryPrompt(input);
    return output!;
  }
);
