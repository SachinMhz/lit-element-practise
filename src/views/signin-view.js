import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { signin } from "../redux/login-actions.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";

class SignInView extends connect(store)(LitElement) {
  static get properties() {
    return {
      error: { type: String },
      credentials: { type: Object },
      loadingStatus: { type: Boolean },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.credentials = { name: "", email: "", password: "" };
    this.signin = this.signin.bind(this);
    this.handleTextChange = this.handleTextChange(this);
  }

  stateChanged(state) {
    this.error = state.login.loginError;
    this.loadingStatus = state.login.loginLoading;
  }

  handleTextChange(e, key) {
    this.credentials = { ...this.credentials, [key]: e.target.value };
  }

  signin(e) {
    store.dispatch(signin(this.credentials)).then((res) => {
      this.credentials = { name: "", email: "", password: "" };
      Router.go(ENDPOINTS.BLOG_LIST);
    });
  }

  render() {
    const { email, password, name } = this.credentials;
    return html`
      <div class="wrapper">
        <h1>Create a new account</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            outlined
            label="Name"
            icon="person"
            .value="${name}"
            placeholder="Jhon Doe"
            @keyup="${(e) => this.handleTextChange(e, "name")}"
          ></mwc-textfield>
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
            label="${this.loadingStatus ? "Signing ..." : "Sign in"}"
            @click="${this.signin}"
          ></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define("signin-view", SignInView);
