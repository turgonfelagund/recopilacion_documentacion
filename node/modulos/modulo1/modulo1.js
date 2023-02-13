
module.exports.persona1 = {
    "nombre": "Juan",
    "apellido": "Bond",
};

module.exports.persona2 = {
    nombre: "Ana",
    apellido: "Hernández",
}

function saludar(nombre) {
    return `hola ${nombre}`;
}

module.exports.saludar = saludar;

//Notación como objeto
/* module.exports = {
    saludar: saludar,
    persona1: {
        "nombre": "Juan",
        "apellido": "Bond",
    },
    persona2: {
        nombre: "Ana",
        apellido: "Hernández",
    }
} */