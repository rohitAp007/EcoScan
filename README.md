# EcoScan

EcoScan is a Next.js application that allows you to scan product barcodes and get an AI-powered analysis of their environmental impact. Yes, this is an AI model-driven app! It uses generative AI to provide detailed insights into how eco-friendly your food products are.

## Screenshots

<div style="display: flex; gap: 16px; justify-content: center;">
    <img src="https://placehold.co/400x600?text=EcoScan+Home" alt="EcoScan Home Screen" width="300" />
    <img src="https://placehold.co/400x600?text=Eco+Score+Analysis" alt="Product Analysis Screen" width="300" />
</div>

## Features

-   **Barcode Scanning**: Easily scan product barcodes using your device's camera.
-   **Manual Entry**: Don't have the product handy? Enter the barcode number manually.
-   **AI-Powered Eco Analysis**: Get an estimated Eco-Score (from A to F) and a detailed summary of the product's environmental impact.
-   **Eco-Friendly Alternatives**: Receive suggestions for more sustainable product choices.
-   **Privacy-First**: No login or account is required to use the app.

## Running Locally

To get started, follow these steps to run the project on your local machine.

### 1. Install Dependencies

First, you'll need to install the project's dependencies using npm. Open your terminal in the project's root directory and run:

```bash
npm install
```

### 2. Set Up Environment Variables

The application uses the Gemini API for its AI features, which requires an API key.

1.  Create a new file named `.env` in the root of your project directory.
2.  Add the following line to the `.env` file, replacing `<YOUR_API_KEY>` with your actual Gemini API key:

```
GEMINI_API_KEY=<YOUR_API_KEY>
```

You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Server

Once your dependencies are installed and your environment variable is set, you can start the Next.js development server.

```bash
npm run dev
```

The application will now be running at [http://localhost:9002](http://localhost:9002).
