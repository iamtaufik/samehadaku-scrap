const express = require('express');
const cors = require('cors');
const { getRecentEpisodes } = require('./controllers/AnimeController.js');
const dotenv = require('dotenv');
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
