import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { signin } from "../redux/login-actions.js";
import { BaseView } from "../components/base-view";

class SignInView extends connect(store)(BaseView) {
  static get properties() {
    return {
      name: { type: String },
      email: { type: String },
      password: { type: String },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.email = "";
    this.password = "";
    this.name = "";
  }

  stateChanged(state) {
    this.error = state.login.loginError;
    if (state.login.user) {
      window.location.href = "http://localhost:8080/blogs";
    }
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
    if (this.email && this.password) {
      store.dispatch(signin(this.email, this.password)).then((res) => {
        this.email = "";
        this.password = "";
      });
    }
  }
  render() {
    return html`
      <style>
        mwc-textfield {
          --mdc-theme-primary: green;
        }
        mwc-button {
          --mdc-theme-primary: green;
          --mdc-theme-on-primary: white;
        }
        .login-wrapper {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .login-container {
          display: flex;
          width: 40vw;
          min-width: 300px;
          align-items: center;
          flex-direction: column;
        }
        .login-textfield {
          width: 100%;
          padding: 10px 0;
        }
        .login-button {
          margin-top: 15px;
          width: 100%;
        }
        .login-error {
          color: #a94442;
          background-color: #f2dede;
          border-color: #ebccd1;
          padding: 15px;
          margin-bottom: 20px;
          border: 1px solid transparent;
          border-radius: 4px;
          font-size: 13px;
        }
      </style>
      <div class="login-wrapper">
        <h1>Create a new account</h1>
        <div class="login-container">
          <mwc-textfield
            class="login-textfield"
            outlined
            label="Name"
            icon="person"
            value=${this.name}
            placeholder="Jhon Doe"
            @keyup=${this.nameChange}
          ></mwc-textfield>
          <mwc-textfield
            class="login-textfield"
            required
            outlined
            label="Email"
            icon="email"
            value=${this.email}
            placeholder="example@gmail.com"
            @keyup=${this.emailChange}
          ></mwc-textfield>
          <mwc-textfield
            class="login-textfield"
            required
            outlined
            label="Password"
            icon="vpn_key"
            value=${this.password}
            type="password"
            @keyup=${this.passwordChange}
          ></mwc-textfield>
          ${this.error
            ? html`<div class="login-error">${this.error}</div>`
            : null}
          <mwc-button
            class="login-button"
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
