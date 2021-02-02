import { html } from "lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { BaseView } from "../components/base-view.js";

class NavBar extends connect(store)(BaseView) {
  render() {
    const style = "font-size:32px; color:white; margin:0 20px";
    return html`
      <div style="background: rgb(42, 52, 67); padding: 12px 0px">
        <a href="/" style=${style}>Home</a>
        <a href="/blogs" style=${style}>Blogs</a>
        <a href="/create" style=${style}>Create</a>
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
