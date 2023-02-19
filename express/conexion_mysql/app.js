const express = require('express');
//Routers
const { rutaUsuarios } = require('./rutas/usuario.rutas');
//Application
const app = express();
//Statics
app.use(express.static("./public", {
    extensions: ['html', 'htm']
}));

//Stablishment of routers
app.use('/usuario', rutaUsuarios);

//Devuelve una respuesta en caso de que la url de la petición no coincida no exista
app.use('*', (req,res)=>{
    const err = Error(`Requested path ${req.path} not found`);
    res.status(404).send({
        success: false,
        message: `Requested path ${req.path} not found`,
        stack: err.stack,
        });
});

//Se ejecuta con cualquier url
app.all('/', (req,res)=>{
    console.log(`Se ha conectado el dispositivo ${req.ip}`);
    res.redirect('/home');
});

//Muestra la página "welcome.html"
app.all('/home', (req, res) => {
    res.redirect('/home.html')
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
})