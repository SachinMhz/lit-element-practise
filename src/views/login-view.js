import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { login } from "../redux/login-actions.js";
import { BaseView } from "../components/base-view";

class LoginView extends connect(store)(BaseView) {
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
    this.email = "";
    this.password = "";
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
    e.preventDefault();
    if (this.email && this.password) {
      store.dispatch(login(this.email, this.password));
      this.email = "";
      this.password = "";
    }
  }

  render() {
    return html`<div>
      <h2>Login</h2>
      <form action="">
        <label for="email">email:</label><br />
        <input
          type="text"
          id="email"
          name="email"
          value=${this.email}
          @keyup=${this.emailChange}
        /><br />
        <label for="password">password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value=${this.password}
          @keyup=${this.passwordChange}
        /><br />
        <br /><br />
        <div class="error">${this.error}</div>
        <input
          value=${this.loginStatus ? "Logging ..." : "Login"}
          type="submit"
          @click=${this.login}
        />
      </form>
    </div> `;
  }
}

customElements.define("login-view", LoginView);
