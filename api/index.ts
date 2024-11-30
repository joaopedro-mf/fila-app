import dotenv from 'dotenv';
import hospitaisRoutes from './routes/hospitais.routes';

const express = require("express");
const app = express();

dotenv.config();

app.use('/hospitais', hospitaisRoutes);

module.exports = app;