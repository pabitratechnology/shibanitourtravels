import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { initDb } from './src/config/db.js';
import apiRouter from './src/routers/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Initialize Gemini Client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn('Warning: GEMINI_API_KEY is not defined in the environment. AI features will fallback to deterministic rules.');
}

// Mount REST API router
app.use('/api', apiRouter);

// AI Trip Estimator Route (kept in main server for modularity/key check)
app.post('/api/ai/estimate', async (req, res) => {
  const { pickup, destination, duration, passengers, vehicleCategory, specialRequest } = req.body;

  if (!ai) {
    return res.json({
      itinerary: `## Customized Odisha Itinerary (${duration})
- **Day 1: Bhubaneswar Heritage:** Pick up from ${pickup || 'Bhubaneswar'}. Visit Mukteswar temple, Lingaraj temple, and Khandagiri caves. Check into premium hotel.
- **Day 2: Coastal Escapade:** Scenic drive to ${destination || 'Puri'} via Konark Marine Drive. Spot dolphins at Chilika Satapada.
- **Day 3: Return & Souvenir Shopping:** Return via Dhauli Stupa and Pipili craft village. Drop-off at ${pickup || 'Bhubaneswar'} airport/station.

*Fallback estimation because AI model is starting. Shibani Tour & Travels guarantees the finest luxury experience in Odisha.*`,
      estimatedFare: 4500,
      breakdown: [
        { label: 'Estimated Distance Fare (70km/day avg)', value: 3800 },
        { label: 'Driver Beta/Night Allowance', value: 400 },
        { label: 'Tolls & State Permits', value: 300 }
      ],
      recommendedVehicles: ['Toyota Innova Crysta', 'Force Urbania Luxury']
    });
  }

  try {
    const prompt = `You are the chief luxury travel designer for Shibani Tour & Travels in Bhubaneswar, Odisha.
Create a highly professional, premium travel itinerary and fare estimate based on:
- Pickup Point: ${pickup}
- Destinations: ${destination}
- Duration of Trip: ${duration}
- Passenger Count: ${passengers}
- Preferred Vehicle: ${vehicleCategory}
- Special requests or preferences: ${specialRequest || 'None'}

Please respond with a JSON object that has exactly these keys:
- "itinerary": A markdown formatted string with a beautiful luxury day-by-day itinerary in Odisha. Mention premium spots (like Jagannath Temple Puri, Chandrabhaga Beach, Satapada dolphins, Lingaraj Temple, Dhauli Peace Pagoda) appropriately.
- "estimatedFare": A single number (integer) representing a realistic tour price in INR (e.g. 7500).
- "breakdown": An array of objects with { "label": "string", "value": number } detailing parts of the cost (e.g. Base fuel fare, driver beta, tolls, GST, luxury amenities).
- "recommendedVehicles": An array of strings with 2 recommended luxury vehicle names from Shibani's fleet (e.g. ["Toyota Innova Crysta", "Force Urbania Luxury (17 Seater)"]).

Only return valid JSON matching this schema. No backticks or text wrapper other than raw JSON or a json block.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: { type: Type.STRING },
            estimatedFare: { type: Type.INTEGER },
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.INTEGER }
                },
                required: ['label', 'value']
              }
            },
            recommendedVehicles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['itinerary', 'estimatedFare', 'breakdown', 'recommendedVehicles']
        }
      }
    });

    const text = response.text || '{}';
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Gemini Trip Estimation Error:', error);
    res.status(500).json({ error: 'Failed to generate AI trip cost estimation', details: error.message });
  }
});

// AI Luxury Travel Concierge Chatbot Route
app.post('/api/ai/chat', async (req, res) => {
  const { messages } = req.body;

  if (!ai) {
    return res.json({
      reply: "Namaskar! Welcome to Shibani Tour & Travels, Bhubaneswar. I'm currently operating in offline-assistance mode, but I can assure you that our fleet of 80+ Premium Vehicles—including Mercedes S-Class, Range Rovers, Toyota Innova Crystas, and luxury Force Urbanias—is ready for your journey across Odisha. How can I help you book or plan your tour today?"
    });
  }

  try {
    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.message }]
    }));

    const currentMsg = messages[messages.length - 1].message;

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: `You are the ultra-premium virtual travel concierge for Shibani Tour & Travels, located in Bhubaneswar, Odisha.
Shibani Tour & Travels is one of the largest and most trusted transport providers in Odisha, with over 15 years of experience and a premium fleet of 80+ vehicles.
Our fleet categories:
- Hatchback & Sedan (Honda City, Dzire)
- SUV (Fortuner, Ertiga, Kia Carens)
- Luxury SUV (Range Rover Sport, Innova Crysta, Toyota Hycross)
- Force Urbania Luxury (13, 17, 26 Seater variants - extremely popular for luxury group travels)
- Tempo Traveller (12 to 26 seaters)
- Luxury Buses (AC Sleeper, Volvo Coach)
- Wedding Luxury Cars (Jaguar, Audi, Mercedes S-Class)

Key customer offerings: Local/Outstation rentals, Wedding car decoration, corporate tie-ups, customized tour packages (Puri, Konark, Chilika Lake, Bhitarkanika Mangroves, Gopalpur, Similipal).

Guidelines:
1. Speak warmly, respectfully, and professionally. Start with a premium tone. Use "Namaskar" occasionally if appropriate.
2. Be incredibly informative about Odisha's sights, travel distances, and temple norms.
3. Suggest the most suitable vehicle based on their requirements (e.g., recommend Force Urbania or Tempo Traveller for group sizes above 10, Innova Crysta for premium family comfort).
4. Do not mention that you are an AI model unless asked. Focus 100% on serving the user on behalf of Shibani Tour & Travels.
5. Keep answers beautifully structured, readable, and under 150 words to maintain high premium engagement.`
      }
    });

    if (formattedHistory.length > 0) {
      // @ts-ignore
      chat.history = formattedHistory;
    }

    const response = await chat.sendMessage({ message: currentMsg });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini Chatbot Error:', error);
    res.status(500).json({ error: 'Chatbot assistance failed', details: error.message });
  }
});

// Vite server setup & static serving
async function start() {
  // Initialize SQLite database and run migration
  try {
    await initDb();
    console.log('SQLite database initialized successfully.');
  } catch (dbErr) {
    console.error('Failed to initialize SQLite database:', dbErr);
    process.exit(1);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('API Dev Mode: Express is running on port 3000, Vite dev server handles frontend.');
  } else {
    let distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      distPath = path.join(process.cwd(), '..', 'frontend', 'dist');
    }
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start();
