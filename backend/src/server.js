// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import complaintRoutes from './routes/complaints.routes.js';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome")
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Only listen locally; export app for Vercel serverless
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
  });
}

export default app;




