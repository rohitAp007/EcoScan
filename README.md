# EcoScan

This is a Next.js application that allows you to scan product barcodes and get an AI-powered analysis of their environmental impact.

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
