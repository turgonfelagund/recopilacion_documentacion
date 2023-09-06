const modelo = require('../modelo/usuario.modelo');

let datos = {
    id: null,
    nombre: null,
    edad: null
};

let arrayDatos;

const cargarUsuarios = (req, res) => {
    modelo.mostrarUsuarios({ res, datos })
        .then(result => {
            if (result.length === 0) res.end(res.json('No se encontraron usuarios'));
            res.send(result)
        })
        .catch(err => res.send(err));

}

const mostrarUsuario = (req, res) => {
    datos = req.body

    modelo.mostrarUsuarioPorId(datos.id)
        .then(result => {
            res.send(result)
        })
        .catch(err => res.send(err));

}

const insertarUsuario = (req, res) => {
    datos = req.params;
    arrayDatos = Object.values(datos);

    modelo.insertarUsuario(arrayDatos)
        .then(result => res.send(`Usuario insertado`))
        .catch(err => res.send(err));
}

const actualizarUsuario = async (req, res) => {
    
    datos = req.body;
    
    arrayDatos = await prepararDatosModificacion(datos);

    modelo.actualizarUsuario(arrayDatos)
        .then(result => {
            res.send(`Ahora el usuario ${arrayDatos[2]} se llama ${arrayDatos[0]} y su edad es ${arrayDatos[1]}`)
        })
        .catch(err => res.send(`No se han podido modificar los datos del usuario ${datos.id}`));
}

const borrarUsuario = (req, res) => {
    
    datos = req.params;

    arrayDatos = Object.values(datos);

    modelo.borrarUsuario(arrayDatos)
        .then(result => {
            if (result.affectedRows === 0) res.end(`No se ha encontrado al usuario ${datos.id}`)
            res.send(`Usuario ${datos.id} borrado con éxito`)
        })
        .catch(err => res.send(err));
}

module.exports = {
    cargarUsuarios,
    mostrarUsuario,
    insertarUsuario,
    actualizarUsuario,
    borrarUsuario
}

const prepararDatosModificacion = async (datos)=>{
    //Almacena los datos actuales del usuario
    let datosUsuario;

    await modelo.mostrarUsuarioPorId(datos.id).then(result => { datosUsuario = result });

    if (datosUsuario.length == 0) return;
    
    //Almacena las propiedades de los datos del usuario (campos en la BBDD)
    let clavesUsuario = Object.keys(datosUsuario[0]);

    //Almacena los valores modificados en el array con los datos del usuario
    for (let i = 0; i < clavesUsuario.length; i++) {
        const clave = clavesUsuario[i];
        if (datos[clave] != undefined && clave != 'id') {
            datosUsuario[0][clave] = datos[clave];
        }
    }
    //Creamos y ordenamos un array a partir del array modificado con los datos de usuario
    let arrayPeticion = Object.values(datosUsuario[0]);

    const id = arrayPeticion[0];
    const nombre = arrayPeticion[1];
    const edad = arrayPeticion[2];

    arrayPeticion = [nombre, edad, id];

    return arrayPeticion;

}