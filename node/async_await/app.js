function ordenarProducto(producto) {
    return new Promise((resolve, err) => {
        console.log('Ordenando: ' + producto);
        setTimeout(() => {
            producto == 'taza' ?
                resolve('Ordenando una taza con logo...') :
                err('Este producto no está disponible actualmente');
        }, 2000);
    })
}

function procesarPedido(respuesta) {
    return new Promise((resolve, err)=>{
        console.log('Procesando respuesta');
        console.log(`La respuesta fue: ${respuesta}`);
        setTimeout(() => {
            resolve('Gracias por tu compra. Disfruta de tu producto');
        }, 4000);
    })
}

async function realizarPedido(producto) {
    try {
        const respuesta = await ordenarProducto(producto);
        console.log('Respuesta recibida');
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (error) {

    }
}

realizarPedido('taza');