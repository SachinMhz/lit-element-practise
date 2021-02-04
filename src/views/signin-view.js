import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { signin } from "../redux/login-actions.js";
import { BaseView } from "../components/base-view";

class SignInView extends connect(store)(BaseView) {
  static get properties() {
    return {
      email: { type: String },
      name: { type: String },
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
    e.preventDefault();
    if (this.email && this.password) {
      store.dispatch(signin(this.email, this.password, this.name));
      this.email = "";
      this.password = "";
    }
  }

  render() {
    return html`<div>
      <h2>Create new account</h2>
      <form action="">
        <label for="name">name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value=${this.name}
          @keyup=${this.nameChange}
        /><br />
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
        <input value="signin" type="submit" @click=${this.signin} />
      </form>
    </div> `;
  }
}

customElements.define("signin-view", SignInView);
