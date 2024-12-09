"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hospital_routes_1 = require("./routes/hospital.routes");
const usuario_routes_1 = require("./routes/usuario.routes");
const express = require("express");
const app = express();
app.use('/hospital', hospital_routes_1.default);
app.use('/usuario', usuario_routes_1.default);
module.exports = app;
