const EventEmitter = require('events');

//Crea una instancia de la clase EventEmitter
const emisorProductos = new EventEmitter();

emisorProductos.on("compra", (total, productos)=>{
    console.log(`Se realizó una compra por ${total}`);
    console.log(`Total de productos: ${productos}`);
});

//Cuando se ejecute esta línea, se va a emitir el disparador "compra" y desencadenará el evento "compra"
//IMPORTANTE. El emisor "emit()" y el evento "on()", deben pertencer a la misma instancia
emisorProductos.emit("compra", 500, 3);
emisorProductos.emit("compra", 400, 3);
