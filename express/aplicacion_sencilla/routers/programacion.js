const express = require('express');

const routerProgramacion = express.Router();

const {programacion} = require('../datos/cursos').infoCursos;

routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res)=>{
    console.log(req.baseUrl);
    //res.setHeader('content-Type', 'text/plain');
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (req, res)=>{
    console.log(req.baseUrl);
    let {lenguaje} = req.params;
    let cursos = programacion.filter(i=> i.lenguaje === lenguaje);

    cursos.length===0 ? 
    res.status(404).send(`No se han encontrado cursos de ${lenguaje}`)
    :res.send(cursos);
})

routerProgramacion.post('/', (req, res)=>{
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(cursoNuevo));
})

routerProgramacion.put('/:id', function (req, res) {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }

    res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res)=>{
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso =>curso.id == id);

    if (indice >= 0) {
        const cursoModificar = programacion[indice];
        Object.assign(cursoModificar, infoActualizada);
    }

    res.send(JSON.stringify(programacion));
});

routerProgramacion.delete(':id', (req, res)=>{
    const id = req.params.id;
    const indice = programacion.findIndex(curso =>curso.id == id);

    if (indice >= 0) {
        programacion.splice(indice, 1);
    }
    res.send(JSON.stringify(programacion));
});

exports.routerProgramacion = routerProgramacion;