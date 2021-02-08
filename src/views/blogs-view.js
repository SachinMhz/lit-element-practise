import { html, LitElement } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import "./blog-create-view";
import "../components/single-blog";
import { store } from "../redux/store";
import { fetchBlog } from "../redux/actions";

class BlogsView extends connect(store)(LitElement) {
  static get properties() {
    return {
      blogs: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    store.dispatch(fetchBlog());
  }

  stateChanged(state) {
    this.blogs = state.blog.blogs;
  }

  render() {
    return html`
      <h1>List of blogs</h1>
      <div>
        ${this.blogs.map(
          (blog) => html`<single-blog .blog="${blog}"></single-blog>`
        )}
      </div>
    `;
  }
}

customElements.define("blogs-view", BlogsView);
