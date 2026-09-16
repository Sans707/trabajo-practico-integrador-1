import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB, sequelize } from '.database.js';
import '.index.js'; // Importa los modelos para que Sequelize los reconozca

import authRoutes from '.auth.routes.js';
import articleRoutes from '.article.routes.js';

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

// Servidor y BD
const startServer = async () => {
  await connectDB();
  await sequelize.sync(); 
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
};

startServer();