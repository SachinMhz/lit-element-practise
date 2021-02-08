import { Router } from "@vaadin/router";
import { connect } from "pwa-helpers";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { login } from "../redux/login-actions.js";
import { ENDPOINT } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";

class LoginView extends connect(store)(LitElement) {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      error: { type: String },
      loginState: { type: Boolean },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.email = "";
    this.password = "";

    this.emailChange.bind(this);
    this.passwordChange.bind(this);
  }

  stateChanged(state) {
    this.error = state.login.loginError;
    this.loginStatus = state.login.loginLoading;
  }

  emailChange(e) {
    this.email = e.target.value;
  }

  passwordChange(e) {
    this.password = e.target.value;
  }

  login(e) {
    store.dispatch(login(this.email, this.password)).then((res) => {
      this.email = "";
      this.password = "";
      Router.go(ENDPOINT.BLOG_LIST);
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <h1>Welcome to Blog App</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Email"
            icon="email"
            value=${this.email}
            placeholder="example@gmail.com"
            @keyup=${this.emailChange}
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Password"
            icon="vpn_key"
            value=${this.password}
            type="password"
            @keyup=${this.passwordChange}
          ></mwc-textfield>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled=${this.email && this.password ? false : true}
            raised
            label=${this.loginStatus ? "Logging ..." : "Log in"}
            @click=${this.login}
          ></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define("login-view", LoginView);
