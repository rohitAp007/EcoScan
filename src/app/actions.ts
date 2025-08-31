
'use server';

import { generateEcoSummary, type GenerateEcoSummaryOutput } from '@/ai/flows/generate-eco-summary';

export type ProductData = {
  name: string;
  imageUrl?: string;
  ecoScoreGrade?: string;
  aiSummary?: GenerateEcoSummaryOutput;
};

export async function getProductData(barcode: string): Promise<{ product?: ProductData; error?: string }> {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`, {
      headers: {
        'User-Agent': 'EcoScan - Web - Version 1.0',
      }
    });

    if (!response.ok) {
      console.error('OpenFoodFacts API Error:', response.status, response.statusText);
      return { error: 'Failed to fetch product data from the API.' };
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
      return { error: `Product with barcode "${barcode}" not found.` };
    }

    const product = data.product;
    const productName = product.product_name;

    if (!productName) {
        return { error: 'Product name not available for this barcode.' };
    }

    let aiSummary;
    try {
        aiSummary = await generateEcoSummary({
          productName: productName,
        });
      } catch (aiError) {
        console.error("AI summary generation failed:", aiError);
        // Do not block product info if AI fails, but there won't be much to show.
      }
      
    const ecoScoreGrade = aiSummary?.ecoScore?.toLowerCase() || product.ecoscore_grade?.toLowerCase();

    const result: ProductData = {
      name: productName || 'Name not available',
      imageUrl: product.image_url,
      ecoScoreGrade: ecoScoreGrade || 'unknown',
      aiSummary: aiSummary,
    };

    return { product: result };
  } catch (err) {
    console.error(err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
