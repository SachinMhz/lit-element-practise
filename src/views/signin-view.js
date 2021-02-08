import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { signin } from "../redux/login-actions.js";
import { ENDPOINT } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";

class SignInView extends connect(store)(LitElement) {
  static get properties() {
    return {
      name: { type: String },
      email: { type: String },
      password: { type: String },
      error: { type: String },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.email = "";
    this.password = "";
    this.name = "";

    this.nameChange.bind(this);
    this.emailChange.bind(this);
    this.passwordChange.bind(this);
  }

  stateChanged(state) {
    this.error = state.login.loginError;
  }

  nameChange(e) {
    this.name = e.target.value;
  }

  emailChange(e) {
    this.email = e.target.value;
  }

  passwordChange(e) {
    this.password = e.target.value;
  }

  signin(e) {
    store.dispatch(signin(this.email, this.password)).then((res) => {
      this.email = "";
      this.password = "";
      Router.go(ENDPOINT.BLOG_LIST);
    });
  }
  render() {
    return html`
     
      <div class="wrapper">
        <h1>Create a new account</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            outlined
            label="Name"
            icon="person"
            value=${this.name}
            placeholder="Jhon Doe"
            @keyup=${this.nameChange}
          ></mwc-textfield>
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
          ${this.error
            ? html`<div class="error">${this.error}</div>`
            : null}
          <mwc-button
            class="button"
            ?disabled=${this.email && this.password ? false : true}
            raised
            label=${this.loginStatus ? "Signing ..." : "Sign in"}
            @click=${this.signin}
          ></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define("signin-view", SignInView);
