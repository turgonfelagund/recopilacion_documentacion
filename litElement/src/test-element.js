import { LitElement, html, css } from "lit-element";

export class TestElement extends LitElement {
    static get styles (){ 
        return[
        css`
            h2 {
                color: blue;
                text-align: center;
            }
        `
    ];}

    render() {
        return html`
        <h2>Soy un componente para pruebas</h2>
        `;
    }
}
customElements.define('test-element', TestElement);