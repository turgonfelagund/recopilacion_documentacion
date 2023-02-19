const express = require('express')

const controlador = require('../controladores/usuario.controlador');

const rutaUsuarios = express.Router();

rutaUsuarios.use(express.json());

rutaUsuarios.get('/listado', controlador.cargarUsuarios);

rutaUsuarios.get('/', controlador.mostrarUsuario);

rutaUsuarios.post('/insertar/:nombre/:edad', controlador.insertarUsuario);

rutaUsuarios.put('/actualizar', controlador.actualizarUsuario);

rutaUsuarios.delete('/borrar/:id', controlador.borrarUsuario)

module.exports = { rutaUsuarios };