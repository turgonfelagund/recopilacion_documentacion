import { LitElement, html, css } from "lit-element";

export class MyElement extends LitElement {
	render() {
		return html`
		<h2 class="titulo">Contador de clicks</h2 class="titulo">
		<h2 class="nombre">Hola ${this.nombre != '' ? this.nombre : `mundo`}</h2>
		<p class="contador">Llevas ${this.clicks} clicks</p>
		<div class="botonesContador">
			<button @click=${this.incrementar}>Haz click aquí</button>
			<button @click=${this.reiniciarClicks}>Reiniciar contador</button>
		</div>
		<div class=${this.mostrar ? "panelControlTest" : 'noMostrar'}>
		<h2 class="titulo">Crea o destruye</h2>
			<button @click=${this.crearComponente}>Crear un componente test</button>
			<button @click=${this.destruirComponente}>Destruye un componente test</button>
		</div>
	`;
	}

	//Cada vez que se renderiza el componente, se inicializa una instancia, luego se ejecuta el constructor
	//Debe llamar al constructor del padre con super() o no renderizará el contenido
	constructor() {
		super()
		this.clicks = 0
	}

	//PROPIEDADES
	/*Define las propiedades reactivas, es decir cada vez que LitElement detecte que 
	cambia alguna de estas propiedades reactivas, volverá a llamar internamente al método render()
	para que se actualice con los nuevos datos.*/
	/*Las propiedades puede ser incializadas desde javascript, o desde la etiqueta del componente*/
	static get properties() {
		return {
			clicks: { type: Number }, //indico el tipo de la propiedad. Vamos a inicializarla en el constructor
			nombre: { type: String }, //Vamos a inicializar esta propiedad como un atributo de la etiqueta del componente
			mostrar: { type: Boolean }, //Se va a usar para ocultar o mostrar el panel de botones que manipulan test-element
		}
	}

	//Incrementa la propiedad de clicks en 1
	incrementar() {
		this.clicks++;
	}

	//Reinicia el contador de clicks
	reiniciarClicks() {
		this.clicks = 0
	}

	//Crear un componente de prueba
	crearComponente() {
		let tComponent = document.createElement("test-element");
		document.getElementsByTagName("body")[0].appendChild(tComponent)
	}

	//Destruye un componente de prueba
	destruirComponente() {
		let tComponent = document.getElementsByTagName('test-element')[0]
		tComponent ? tComponent.remove() : null;
	}

	//Accede al interior de test-element
	verTestComponent() {
		console.log(document.getElementsByTagName('test-element')[0].renderRoot);
	}

	//Muestra un mensaje en consola. Método usado para testear llamadas a métodos del componente desde consola del navegador
	mostrarMensaje(mensaje) {
		console.log(mensaje);
	}

	mostrarRaiz() {
		console.log(this.shadowRoot);
	}

	//ESTILOS

	//Los estilos pueden importarse de un archivo css mediante la claúsula "import", y esto serán genéricos
	//Sin embargo, podemos aplicar estilos específicos para cada componente

	//Existen dos formas de dar estilos específicos a los componentes

	//MÉTODO 1
	//Devuelve una sola pagina de estilos css
	/* static get styles() {
		return css`
		  p {
			color: blue;
		  }
		`;
	  } */

	//MÉTODO 2
	//Pueden aplicarse divesos estilos css
	static get styles() {
		return [
		//Estilos genéricos
			css`
		h2{
			color : red;
			text-align : center
		}
		button{
			width: 25%;
			height: 50px;
			font-size: 15px;
			font-weight:bold;
			background-color: whitesmoke;
			border-radius: 5px;
			border: 1px solid yellow
		}
		`,
		//Estilos de clases
			css`
		.contador{
			font-size : 20px;
			color : white;
			text-align: center
		}
		.nombre{
			color: white;
		}
		.titulo{
			width: 100%
		}
		.noMostrar{
			display : none;
		}
		.botonesContador, .panelControlTest{
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding : 5px;
			flex-wrap:wrap
		}`,
		];
	}

}

customElements.define("my-element", MyElement)