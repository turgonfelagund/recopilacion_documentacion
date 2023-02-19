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