
'use server';

import { generateEcoSummaryForBarcode, type GenerateEcoSummaryOutput } from '@/ai/flows/generate-eco-summary';

export type ProductData = {
  name: string;
  imageUrl?: string;
  ecoScoreGrade?: string;
  aiSummary?: GenerateEcoSummaryOutput;
};

export async function getProductData(barcode: string): Promise<{ product?: ProductData; error?: string }> {
  try {
    const aiSummary = await generateEcoSummaryForBarcode({ barcode });

    if (!aiSummary.productName) {
      return { error: `Product with barcode "${barcode}" not found.` };
    }
    
    const result: ProductData = {
      name: aiSummary.productName,
      imageUrl: aiSummary.imageUrl,
      ecoScoreGrade: aiSummary.ecoScore?.toLowerCase(),
      aiSummary: aiSummary,
    };

    return { product: result };
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
    return { error: `AI analysis failed: ${errorMessage}` };
  }
}
