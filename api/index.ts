import hospitalRoutes from './routes/hospital.routes';
import usuarioRoutes  from './routes/usuario.routes';

const express = require("express");
const app = express();

app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);

module.exports = app;