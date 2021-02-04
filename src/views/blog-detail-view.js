import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store";
import { BaseView } from "../components/base-view";

class BlogDetail extends connect(store)(BaseView) {
  constructor() {
    super();
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
        <div style="display:flex; justify-content: space-between;">
          <span>User: Sachin Maharjan</span
          ><span>Create Date: 20th Jan 2021</span>
        </div>
        <div style="display:flex; justify-content: center;">
          <img src=${this.blog.image} alt="City Image" />
        </div>
        <p>${this.blog.description}</p>
      </div>
    `;
  }
}

customElements.define("blog-detail-view", BlogDetail);