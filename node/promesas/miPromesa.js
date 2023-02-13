const promesaCumplida = false;

const miPromesa = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        promesaCumplida ? resolve('Promesa cumplida') : reject('Promesa rechazada');
    }, 3000)
})

const manejarPromesaCumplida = (valor)=>{
    console.log(valor);
};

const manejarPromesaRechazada = (razonRechazo)=>{
    console.log(razonRechazo);
};

//Se puede manejar el rejected de las dos formas
miPromesa.then(manejarPromesaCumplida, manejarPromesaRechazada)//.catch(manejarPromesaRechazada);