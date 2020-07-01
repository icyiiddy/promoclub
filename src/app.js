import express from 'express';
import { config } from 'dotenv';
import routes from './routes';

config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
