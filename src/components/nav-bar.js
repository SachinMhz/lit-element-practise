import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { logout } from "../redux/login-actions.js";
import { ENDPOINT } from "../constants/endpoints.js";

class NavBar extends connect(store)(LitElement) {
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
    store.dispatch(logout()).then(() => Router.go(ENDPOINT.HOME));
  }

  render() {
    const style = "font-size:32px; color:white; margin:0 20px";
    return html`
      <div style="background: rgb(42, 52, 67); padding: 12px 0px">
        ${!this.isLoggedIn
          ? html`<a href="${ENDPOINT.LOGIN}" .style="${style}">Log In</a>
              <a href="${ENDPOINT.SIGNIN}" .style="${style}">Sign In</a>`
          : html` <a href="${ENDPOINT.BLOG_LIST}" .style="${style}">Blogs</a>
              <a href="${ENDPOINT.CREATE}" .style="${style}">Create</a>
              <a href="${ENDPOINT.HOME}" .style="${style}" @click=${this.logout}
                >Logout</a
              >`}
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
