import especialidadesRoutes from './routes/especialidades.routes';
import hospitalRoutes from './routes/hospital.routes';
import usuarioRoutes  from './routes/usuario.routes';
import operadoraplanosaudeRoutes from './routes/operadoraplanosaude.routes';

const express = require("express");
const app = express();

app.use('/especialidades', especialidadesRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/operadoraplanosaude', operadoraplanosaudeRoutes);

module.exports = app;