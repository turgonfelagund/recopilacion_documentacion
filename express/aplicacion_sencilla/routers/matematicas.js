const express = require('express');

const routerMatematicas = express.Router();

const { matematicas } = require('../datos/cursos').infoCursos;

routerMatematicas.get('/', (req, res) => {
    //res.setHeader('content-Type', 'text/plain');
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(matematicas));
});

routerMatematicas.use("/:tema", (req, res) => {
    const { tema } = req.params;
    const resultados = matematicas.filter(curso => curso.tema === tema);

    resultados.length === 0 ?
        res.status(404).send(`No se encontraron cursos de ${tema}`)
        : res.send(JSON.stringify(resultados));
});

exports.routerMatematicas = routerMatematicas;