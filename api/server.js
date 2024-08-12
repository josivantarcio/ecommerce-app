const express = require('express');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Definir ambiente
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI);

// Definir view engine, se necessário
app.set("view engine", "ejs");

// Middlewares
if (!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/public/images", express.static(path.join(__dirname, "/public/images")));

// Rotas
require("./models");
app.use("/", require("./routes"));

// Tratamento de erros
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json({ erros: { message: err.message, status: err.status } });
});

// Iniciar o servidor
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Servidor rodando na porta ${PORT}`);
});
