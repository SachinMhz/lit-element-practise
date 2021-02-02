import { html } from "lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { BaseView } from "../components/base-view.js";

class NavBar extends connect(store)(BaseView) {
  render() {
    return html`
      <div style="background: rgb(42, 52, 67); padding: 12px 0px">
        <a href="/">Home</a>
        <a href="/blogs">Blogs</a>
        <a href="/blog">Blog</a>
        <a href="/create">Create</a>
        <a href="/update">Update</a>
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
