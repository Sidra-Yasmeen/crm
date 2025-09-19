import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
// Import other routes as you create them
// import kbRoutes from './routes/kb.js';

const app = express();

// --- Middlewares ---
// Enable Cross-Origin Resource Sharing for your frontend
app.use(cors());
// This is the crucial part: enable the express.json middleware to parse JSON bodies
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
// app.use('/api/kb', kbRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));