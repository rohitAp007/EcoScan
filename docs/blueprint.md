# **App Name**: EcoScan

## Core Features:

- Barcode Scanning: Enable scanning barcodes using the device's camera; fall back to manual entry if camera access is denied or the API is unsupported. Display a prominent scan icon.
- Manual Entry: Allow users to manually enter a barcode via a numeric input field with a search button.
- Product Lookup: Fetch product data, focusing solely on the Eco-Score, from the OpenFoodFacts API.
- Eco Verdict: Display a clear verdict ('Eco-Friendly', 'Neutral', 'Not Eco-Friendly', or 'Unknown') based on the product's Eco-Score.
- Error Handling: Provide user-friendly error messages for product not found, API failures, and camera permission issues.
- Summary Generation: Use a tool to generate an environmentally conscious summary and alternative recommendations to show the user for each scanned item. This tool will use reasoning to determine if either piece of information should be displayed, in context.

## Style Guidelines:

- Primary color: HSL (98, 70%, 44%) - A vibrant chartreuse (#A3E022) to evoke feelings of nature and eco-friendliness without being cliche, contrasting well on a light background.
- Background color: HSL (98, 20%, 95%) - Very light green (#F4F8EC), providing a soft and clean base.
- Accent color: HSL (68, 97%, 62%) - A vivid greenish-yellow (#F2FF33), creating high contrast for calls to action and important information.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text.
- Use minimalist icons for scanning and other actions.
- Mobile-first design with a clean, minimal layout for easy navigation.
- Subtle loading spinner while fetching data and smooth transitions between states.