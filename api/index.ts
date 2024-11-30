import dotenv  from 'dotenv';
import hospitaisRoutes from './routes/hospitais.routes';
import usuarioRoutes  from './routes/user.routes';

const express = require("express");
const app = express();

dotenv.config();

app.use('/hospitais', hospitaisRoutes);
app.use('/usuario', usuarioRoutes);



module.exports = app;