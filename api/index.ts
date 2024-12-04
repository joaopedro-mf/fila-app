import hospitalRoutes from './routes/hospital.routes';
import userRoutes  from './routes/user.routes';

const express = require("express");
const app = express();

app.use('/hospital', hospitalRoutes);
app.use('/user', userRoutes);

module.exports = app;