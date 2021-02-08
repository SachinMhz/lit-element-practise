import { html, LitElement } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { login } from "../redux/login-actions.js";

class LoginView extends connect(store)(LitElement) {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
      error: { type: String },
      loginState: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.email = "admin@gmail.com";
    this.password = "admin123";
  }

  stateChanged(state) {
    this.error = state.login.loginError;
    this.loginStatus = state.login.loginLoading;
    if (state.login.user) {
      window.location.href = "http://localhost:8080/blogs";
    }
  }
  emailChange(e) {
    this.email = e.target.value;
  }
  passwordChange(e) {
    this.password = e.target.value;
  }

  login(e) {
    if (this.email && this.password) {
      store.dispatch(login(this.email, this.password)).then((res) => {
        this.email = "";
        this.password = "";
      });
    }
  }

  render() {
    return html`
      <style>
        mwc-textfield {
          --mdc-theme-primary: rgb(42, 52, 67);
        }
        mwc-button {
          --mdc-theme-primary: rgb(42, 52, 67);
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
        <h1>Welcome to Blog App</h1>
        <div class="login-container">
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
            label=${this.loginStatus ? "Logging ..." : "Log in"}
            @click=${this.login}
          ></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define("login-view", LoginView);
