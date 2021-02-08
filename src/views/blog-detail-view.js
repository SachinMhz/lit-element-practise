import { connect } from "pwa-helpers";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store";
import { customStyles } from "../style/custom-style";

class BlogDetail extends connect(store)(LitElement) {
  constructor() {
    super();
    this.blog = { title: "", description: "", image: "", createDate: "" };
  }

  static get styles() {
    return [customStyles];
  }

  stateChanged(state) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.blog = state.blog.blogs.find((blog) => blog.id == id);
  }

  render() {
    return html`
      <div>
        <h1>${this.blog.title}</h1>
        <div class="user-info">
          <span>User: Sachin Maharjan</span
          ><span>Create Date: ${this.blog.createDate}</span>
        </div>
        <div class="blog-content">
          <img .src="${this.blog.image}" alt="City Image" />
        </div>
        <p>${this.blog.description}</p>
      </div>
    `;
  }
}

customElements.define("blog-detail-view", BlogDetail);
