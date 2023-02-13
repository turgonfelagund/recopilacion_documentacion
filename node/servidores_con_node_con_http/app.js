const http = require('http');

//servidor para información de request
const servidor = http.createServer((req, res) => {
    console.log('solicitud nueva');
    console.log('=====>URL');
    console.log(req.url);
    console.log('=====>METHOD');
    console.log(req.method);
    console.log('=====>HEADERS');
    console.log(req.headers['user-agent']);
    //console.log({req, res});
    res.end('hola mundo');
})

const puerto = 3000;

//Servidor para manipulacion respuesta
const servidor2 = http.createServer((req, res) => {
    console.log({ req });
    //con la siguiente línea podemos especificar la codificación
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write('Envío durante respuesta');
    res.write('Envío 2');
    res.end('Petición enviada');
})

const puerto2 = 4000;

//Servidor para información de response
const servidor3 = http.createServer((req, res) => {
    console.log('===> res (respuesta)');
    console.log(res.statusCode);

    //El código de estado puede modificarse
    res.statusCode = 404;

    //Permite configurar un elemento de la cabecera
    res.setHeader('content-type', 'application/json')

    //Devuelve ver los elementos de la cabecera
    console.log(res.getHeaders());

    res.end();
})

const puerto3 = 5000;

servidor.listen(puerto, () => {
    console.log(`El servidor está escuchando en el puerto ${puerto}`);
});

servidor2.listen(puerto2, () => {
    console.log(`Servidor 2 escuchando en el puerto ${puerto2}...`);
})

servidor3.listen(puerto3, () => {
    console.log(`Servidor 3 escuchando en el puerto ${puerto3}...`);
})