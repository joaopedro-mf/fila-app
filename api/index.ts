import especialidadesRoutes from './routes/especialidades.routes';
import hospitalRoutes from './routes/hospital.routes';
import usuarioRoutes  from './routes/usuario.routes';
import operadoraplanosaudeRoutes from './routes/operadoraplanosaude.routes';
import guiaRoutes from './routes/guia.routes';
import autorizacaoRoutes from './routes/autorizacao.routes';
import loginRoutes from './routes/login.routes';
import { authMiddleware } from './middlewares/authMiddleware';
import * as bodyParser from 'body-parser'; 

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true , parameterLimit:50000}));

app.use(express.json());
app.use('/login', loginRoutes);
app.use('/operadoras', operadoraplanosaudeRoutes);

app.use(authMiddleware);

app.use('/especialidades', especialidadesRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/guia', guiaRoutes);
app.use('/autorizacao', autorizacaoRoutes);

module.exports = app;
