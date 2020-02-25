import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import secret from './data/secret';
import db from './data/server';

const app = express();
dotenv.config();

app.set('Secret', secret);
app.use(morgan('dev'));

app.use(json());
app.use(urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => console.log(`App is listening on port ${process.env.PORT}`));
  app.use('/api', routes);
});
