import especialidadesRoutes from './routes/especialidades.routes';
import hospitalRoutes from './routes/hospital.routes';
import usuarioRoutes  from './routes/usuario.routes';
import operadoraplanosaudeRoutes from './routes/operadoraplanosaude.routes';
import guiaRoutes from './routes/guia.routes';
import autorizacaoRoutes from './routes/autorizacao.routes';

const express = require("express");
const app = express();

app.use(express.json());

app.use('/especialidades', especialidadesRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/operadoras', operadoraplanosaudeRoutes);
app.use('/guia', guiaRoutes);
app.use('/autorizacao', autorizacaoRoutes);

module.exports = app;