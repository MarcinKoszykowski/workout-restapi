import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import db from './data/server';

const app = express();
dotenv.config();

app.use(morgan('dev'));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  console.log('Connected to MongoDB'); // eslint-disable-line
  app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`)); // eslint-disable-line
  app.use('/api', routes);
});
