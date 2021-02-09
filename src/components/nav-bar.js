import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { logout } from "../redux/login-actions.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { navBarStyle } from "../style/custom-style.js";

class NavBar extends connect(store)(LitElement) {
  static get properties() {
    return {
      isLoggedIn: {
        type: Object,
      },
    };
  }

  static get styles() {
    return [navBarStyle];
  }

  stateChanged(state) {
    this.isLoggedIn = state.login.user;
  }

  logout() {
    store.dispatch(logout()).then(() => Router.go(ENDPOINTS.HOME));
  }

  render() {
    return html`
      <div class="nav-bar-wrapper">
        ${!this.isLoggedIn
          ? html`<a href="${ENDPOINTS.LOGIN}">Log In</a>
              <a href="${ENDPOINTS.SIGNIN}">Sign In</a>`
          : html` <a href="${ENDPOINTS.BLOG_LIST}">Blogs</a>
              <a href="${ENDPOINTS.CREATE}">Create</a>
              <a href="${ENDPOINTS.HOME}" @click=${this.logout}>Logout</a>`}
      </div>
    `;
  }
}

customElements.define("nav-bar", NavBar);
