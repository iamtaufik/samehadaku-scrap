import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRecentEpisodes } from './controllers/AnimeController.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.get('/api/anime', getRecentEpisodes);

app.listen(PORT, () => {
  console.log('server up and runing');
});
