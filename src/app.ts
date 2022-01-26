import express from 'express';
import cors from 'cors';
import logger from 'morgan';

require('dotenv').config();

// Criando a instancia do app
const app: any = express();

app.use(express.json);
app.use(cors());
app.use(logger('dev'));

export default app;
