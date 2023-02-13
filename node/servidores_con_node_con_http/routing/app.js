//Llamada al servidor y retorno de json
function cargarCursos() {
    fetch('http://localhost:3000/cursos')
        .then((res) => res.json())
        .then((text) => { console.log(text); })
        .catch(err => {
            console.log(err);
        })
}

//Accede a raiz del host
function llamada() {
    fetch('http://localhost:3000')
        .then(res => res.text())
        .then(text => console.log(text))
}

function llamadaPOST() {
    fetch('http://localhost:3000/cursos/programacion', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"mensaje" : "Este es el cuerpo de la petición"})
    })
        .then(res => res.text())
        .then(text => console.log(text))
}

cargarCursos();

//llamada()

//llamadaPOST()