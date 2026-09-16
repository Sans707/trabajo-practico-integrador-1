import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database.js';
import './models/index.js';

import authRoutes from './routes/auth.routes.js';
import articleRoutes from './routes/article.routes.js';
import tagRoutes from './routes/tag.routes.js';
import articleTagRoutes from './routes/articleTag.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// Rutas para tags y article-tags
app.use('/api/tags', tagRoutes);
app.use('/api/articles-tags', articleTagRoutes);

// Servidor y BD
const startServer = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
};

startServer();