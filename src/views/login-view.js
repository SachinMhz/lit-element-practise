import { Router } from "@vaadin/router";
import { connect } from "pwa-helpers";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { login } from "../redux/login-actions.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";

class LoginView extends connect(store)(LitElement) {
  static get properties() {
    return {
      error: { type: String },
      credentials: { type: Object },
      loginState: { type: Boolean },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.credentials = { email: "", password: "" };
    this.login = this.login.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  stateChanged(state) {
    this.error = state.login.loginError;
    this.loginStatus = state.login.loginLoading;
  }

  handleTextChange(e, key) {
    this.credentials = { ...this.credentials, [key]: e.target.value };
  }

  login(e) {
    e.preventDefault();
    store.dispatch(login(this.credentials)).then(() => {
      this.credentials = { email: "", password: "" };
      Router.go(ENDPOINTS.BLOG_LIST);
    });
  }

  render() {
    const { email, password } = this.credentials;
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
            .value="${email}"
            placeholder="example@gmail.com"
            @keyup="${(e) => this.handleTextChange(e, "email")}"
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Password"
            icon="vpn_key"
            .value="${password}"
            type="password"
            @keyup="${(e) => this.handleTextChange(e, "password")}"
          ></mwc-textfield>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled="${email && password ? false : true}"
            raised
            label="${this.loginStatus ? "Logging ..." : "Log in"}"
            @click="${this.login}"
          ></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define("login-view", LoginView);
