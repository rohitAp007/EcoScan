'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an eco-friendly summary of a product and alternative recommendations.
 *
 * - generateEcoSummaryForBarcode - A function that takes a product barcode and returns a summary of its environmental impact, an estimated eco-score, and eco-friendly alternatives.
 * - GenerateEcoSummaryForBarcodeInput - The input type for the generateEcoSummaryForBarcode function.
 * - GenerateEcoSummaryOutput - The return type for the generateEcoSummaryForBarcode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEcoSummaryForBarcodeInputSchema = z.object({
  barcode: z.string().describe('The barcode of the product.'),
});
export type GenerateEcoSummaryForBarcodeInput = z.infer<typeof GenerateEcoSummaryForBarcodeInputSchema>;

const GenerateEcoSummaryOutputSchema = z.object({
  productName: z.string().optional().describe('The name of the product. If not found, this can be empty.'),
  imageUrl: z.string().optional().describe('A public URL for an image of the product. Can be a placeholder if no image is found.'),
  ecoScore: z.string().describe("An estimated Eco-Score for the product (A, B, C, D, E, or F). Base your estimation on the product type, packaging, and other relevant factors. For example, a product in a plastic bottle might get a D, while a glass bottle might get a C."),
  summary: z.string().optional().describe('A summary of the product\'s environmental impact. If the impact is high (D, E, F), explain why. If it is low (A, B), also explain why.'),
  recommendations: z.string().optional().describe('Alternative eco-friendly product recommendations. Only provide recommendations if better alternatives are readily available.'),
});
export type GenerateEcoSummaryOutput = z.infer<typeof GenerateEcoSummaryOutputSchema>;

export async function generateEcoSummaryForBarcode(input: GenerateEcoSummaryForBarcodeInput): Promise<GenerateEcoSummaryOutput> {
  return generateEcoSummaryFlow(input);
}

const generateEcoSummaryPrompt = ai.definePrompt({
  name: 'generateEcoSummaryPrompt',
  input: {schema: GenerateEcoSummaryForBarcodeInputSchema},
  output: {schema: GenerateEcoSummaryOutputSchema},
  prompt: `You are an AI assistant designed to provide users with information about the environmental impact of products.

  Given the product barcode "{{barcode}}", research the product and generate the following:
  
  1.  **Product Name**: The name of the product. If you cannot find it, leave it blank.
  2.  **Image URL**: A public URL for an image of the product. If you cannot find one, do not provide one.
  3.  **Eco-Score:** Estimate an Eco-Score (A-F) for the product. Base your estimation on the product type, its typical packaging, and other relevant environmental factors. For example, a product in a plastic bottle might get a D, while a glass bottle might get a C.
  4.  **Summary:** A concise summary of the product's environmental impact. If the impact is high (D, E, F), explain why. If it is low (A, B), also explain why.
  5.  **Recommendations:** If there are readily available eco-friendly alternatives to the product, provide a short list of recommendations. Only provide recommendations if better alternatives are readily available.
  `,
});

const generateEcoSummaryFlow = ai.defineFlow(
  {
    name: 'generateEcoSummaryFlow',
    inputSchema: GenerateEcoSummaryForBarcodeInputSchema,
    outputSchema: GenerateEcoSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateEcoSummaryPrompt(input);
    return output!;
  }
);
