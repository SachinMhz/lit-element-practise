import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store";
import "../components/single-blog";
import { BaseView } from "../components/base-view";
import "./blog-create-view";

class BlogsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      blogs: { type: Array },
    };
  }

  stateChanged(state) {
    this.blogs = state.blogs;
  }

  render() {
    return html`
      <h1>List of blogs</h1>
      <div>
        ${this.blogs.map(
          (blog) => html`<single-blog .blog=${blog}></single-blog>`
        )}
      </div>
    `;
  }
}

customElements.define("blogs-view", BlogsView);
