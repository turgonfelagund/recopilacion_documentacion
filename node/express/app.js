const express = require('express');
const app = express();

const {infoCursos} = require('./datos/cursos.js');

//Routers
const {routerMatematicas} = require('./routers/matematicas');
const {routerProgramacion} = require('./routers/programacion');
const routerCursos = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);
app.use('/api/cursos', routerCursos);

//Devuelve un mensaje
app.get('/', (req, res)=>{
    res.send('Mi primer servidor 💻');
});

//Devuelve cursos
routerCursos.get('/', (req, res)=>{
    //Para que se vea el cambio, limpiar caché
    //res.header({"Content-Type": "text/plain; charset=utf8"}) //Hace que el navegador interprete la respuesta como texto plano
    res.header({"Content-Type": "application/json"}) //Hce que el navegador interprete la repsuest como JSON
    res.send(JSON.stringify(infoCursos)); //Envia la información como cadena JSON
});

//Devuelve cursos especificados mediante materia y tema
/* routerCursos.get('/:categoria/:tema', (req, res)=>{
    let {categoria, tema} = req.params;
    let materias = {
        programacion : "lenguaje",
        matematicas : "tema"
    }
    let mat = categoria in materias? materias[`${categoria}`] : null;
    let cursos = infoCursos[`${categoria}`].filter(i=>i[`${mat}`] === tema);

    cursos.length !== 0? res.send(JSON.stringify(cursos)) 
    : res.status(404).setHeader('content-type', 'text/plain').send(`No se ha encontrado lo que busca`)
}); */

//Ejemplo de uso de parámetros de ruta.
//Devuelve los parámetros introducidos
app.use("/usuario/:nombre/:id", (req, res)=>{
    let nombre = req.params.nombre;
    let {id} = req.params;
    console.log(`${nombre} ${id}`);
    res.send(nombre);
})

//Ejemplo de uso de parámetros Query
//Devuelve los parámetros introducidos
app.use("/user", (req, res)=>{
    let {nombre, apellido} = req.query;
    console.log(`${nombre} ${apellido}`);
    res.send(`Bienvenido ${nombre} ${apellido}`);
})

//Si no existe la variable PORT en el entorno del servidor, se asigna el 3000
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>{
    console.log(`El servidor está escuchando en el puerto: ${PUERTO}...`);
})