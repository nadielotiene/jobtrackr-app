import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import applicationRoutes from './routes/applications';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://jobtrackr-ebon.vercel.app'] 
}));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});