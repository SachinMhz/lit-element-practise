import { html, LitElement } from "@polymer/lit-element";

class NotFoundView extends LitElement {
  render() {
    return html`
      <h1>View not found!</h1>
      <p>Please check your URL.</p>
    `;
  }
}

customElements.define("not-found-view", NotFoundView);
