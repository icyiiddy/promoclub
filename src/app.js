import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(() => console.log(`App listening on port ${port}`));
