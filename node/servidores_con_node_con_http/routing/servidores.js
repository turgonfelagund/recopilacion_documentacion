const http = require('http');
const cursos = require('./cursos.js') //la extension no es necesaria

const servidor = http.createServer((req, res) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            return manejarSolicitudGET(req, res);
        case 'POST':
            return manejaraSolicitudPOST(req,res);
        default:
            res.statusCode=501;
            res.end(`El método no puede ser manejado por el servidor ${method}`);
            break;
    }

});

function manejarSolicitudGET(req, res) {
    const path = req.url;

    if (path === '/') {
        res.writeHead(200, {"Content-Type" : "text/plain"});
        //res.write('Bienvenidos a mi 1er servidor y API creados con Node.js', 'utf8', ()=>{console.log(`respuesta enviada a: ${req.headers.host}`);});
        return res.end('Bienvenidos a mi 1er servidor y API creados con Node.js', 'utf8', ()=>{console.log(`respuesta enviada a: ${req.headers.host}`);});
    } 
    else if (path === '/cursos') {
        /*Para comprobar el cambio que supone cargar el contenido sin modificar dede el lado del cliente
            alternar las 2 líneas siguientes
        */
        res.writeHead(200, {"Content-Type" : "application/json"});
        //res.writeHead(200, {"Content-Type" : "text/plain; charset=UTF-8"});
        return res.end(JSON.stringify(cursos.infoCursos), 'utf8', ()=>{console.log(`respuesta enviada a: ${req.headers.host}`);});
    } 
    else if (path === '/cursos/programacion') {
        res.writeHead(200, {"Content-Type" : "application/json"});
        return res.end(JSON.stringify(cursos.infoCursos.programacion), 'utf8', ()=>{console.log(`respuesta enviada a: ${req.headers.host}`);});
    }
    else {
        res.writeHead(404, {"Content-Type" : "text/plain"});
        //res.statusCode = 404;
        //Para poder recoger la cadena para un error, se debe mandar como texto, o sea, stringify()
        return res.end(JSON.stringify('El recurso solicitado no existe'), 'utf8');
    }
}

function manejaraSolicitudPOST(req, res) {
    const path  = req.url;
    
    if(path === '/cursos/programacion'){
        res.statusCode = 200;
        let cuerpo;
        req.on('data', (contenido)=>{
            //cuerpo = contenido.toString(); //Para strings
            cuerpo = JSON.parse(contenido)
        });

        req.on('end', ()=>{
            console.log(cuerpo);
            console.log(typeof cuerpo);
            res.end(`El servidor recibió una solicitud POST para ${path}`);
        });

        //res.end(`El servidor recibió una solicitud POST para ${path}`);
    }
}

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});