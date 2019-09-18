const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || process.env.LOCALPORT;

app.listen(`App listening on port ${port}`);
