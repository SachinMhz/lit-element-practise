import { html } from "lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { logout } from "../redux/login-actions.js";
import { BaseView } from "../components/base-view.js";

class NavBar extends connect(store)(BaseView) {
  static get properties() {
    return {
      isLoggedIn: {
        type: Object,
      },
    };
  }

  stateChanged(state) {
    this.isLoggedIn = state.login.user;
  }

  logout() {
    store.dispatch(logout());
    window.location.href = "http://localhost:8080/";
  }

  render() {
    const style = "font-size:32px; color:white; margin:0 20px";
    return html`
      <div style="background: rgb(42, 52, 67); padding: 12px 0px">
        ${!this.isLoggedIn
          ? html`<a href="/" style=${style}>Log In</a>
              <a href="/sign-in" style=${style}>Sign In</a>`
          : html` <a href="/blogs" style=${style}>Blogs</a>
              <a href="/create" style=${style}>Create</a>
              <a href="/" style=${style} @click=${this.logout}>Logout</a>`}
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
