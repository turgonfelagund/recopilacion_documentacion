const { conexion } = require('../config')

let setConsultas = {
    cargaUsuarios: {
        query: `SELECT * FROM usuario`,
        err: 'No se han encontrado usuarios'
    },
    mostrarUsuario: {
        query: `SELECT * FROM usuario WHERE id = ?`,
        err: `No se ha encontrado información del usuario`
    },
    insercionUsuario: {
        query: `INSERT INTO usuario (nombre, edad) values(?, ?)`,
        err: `No se ha podido insertar el nuevo usuario`
    },
    actualizacionUsuario: {
        query: `UPDATE usuario SET nombre = ?, edad = ? WHERE id = ?`,
        err: `No se ha podido actualizar al usuario`
    },
    borradoUsuario: {
        query: `DELETE FROM usuario WHERE id = ?`,
        err: `No se pudo eliminar al usuario`
    }
}

//FUNCIONES CURRYING

//Método consulta 1 Devolver promesa
//No produce problema de recursividad
function consulta(sql) {
    function a(datos = []) {
        return new Promise((resolve, reject) => {
            conexion.query(sql['query'], datos, (err, resultado, fields) => {
                err ? reject(sql['err']) : resolve(resultado);
            })
        })
    }
    return a;
}

//Método consulta 2 Devolver promesa y respuesta

//NO FUNCIONA BIEN DEBIDO A QUE DA PROBLEMA DE RECURSIVIDAD

/* const consultaConRespuesta = (sql) => {
    console.log('hola pancho');
    function promesa({ res, datos = [] }) {
        const arrayDatos = Object.values(datos);
        new Promise((resolve, reject) => conexion.query(sql['query'], arrayDatos, (err, resultado, fields) => {
            err ? reject(err) : resolve(resultado);
        }))
            .then(result => {
                if (result.length === 0) throw 'No se ha completado la consulta';
                res.send(result)
            })
            .catch(err => {
                //res.send(err);
                res.send(sql['err'])
            });
    }
    return promesa
} */


//FUNCIONES CONVENCIONALES

/* function insertarUsuarioTest(datos){
    return new Promise((resolve, reject) => {
        conexion.query(consultas.insercionUsuario.query, datos, (err, resultado, fields) => {
            err ? reject(err) : resolve(resultado);
        })
    })
} */


const mostrarUsuarios = consulta(setConsultas.cargaUsuarios)

const mostrarUsuarioPorId = consulta(setConsultas.mostrarUsuario);

const insertarUsuario = consulta(setConsultas.insercionUsuario);

const actualizarUsuario = consulta(setConsultas.actualizacionUsuario);

const borrarUsuario = consulta(setConsultas.borradoUsuario);

module.exports = {
    mostrarUsuarios, //Resuelve promesa para obtener listado de usuarios
    mostrarUsuarioPorId, //Muestra un usuario mediante id
    insertarUsuario, //Inserta un usuario
    actualizarUsuario,
    borrarUsuario, //Elimina a un usuario de la BBDD mediante su id
}