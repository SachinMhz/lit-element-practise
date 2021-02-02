import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { updateBlog } from "../redux/actions.js";
import { BaseView } from "../components/base-view";

class BlogUpdate extends connect(store)(BaseView) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      description: { type: String },
    };
  }

  constructor() {
    super();
  }

  stateChanged(state) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.blog = state.blogs.find((blog) => blog.id == id);

    this.title = this.blog.title;
    this.description = this.blog.description;
    this.image = this.blog.image;
  }

  titleChange(e) {
    this.title = e.target.value;
  }
  imageChange(e) {
    this.image = e.target.value;
  }
  descriptionChange(e) {
    this.description = e.target.value;
  }

  updateBlog(e) {
    e.preventDefault();
    if (this.title && this.description) {
      let blog = {
        id: this.blog.id,
        title: this.title,
        description: this.description,
        image: this.image,
      };
      store.dispatch(updateBlog(blog));
    }
  }

  render() {
    return html`<div>
      <h2>Update Blog</h2>
      <form action="">
        <label for="title">Title:</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value=${this.blog.title}
          @keyup=${this.titleChange}
        /><br />
        <label for="image">Image URL:</label><br />
        <input
          type="text"
          id="image"
          name="image"
          value=${this.blog.image}
          @keyup=${this.imageChange}
        /><br />
        <label for="blog">Description:</label><br />
        <textarea
          type="text"
          id="blog"
          name="blog"
          rows="16"
          cols="64"
          @keyup=${this.descriptionChange}
        >
${this.blog.description}</textarea
        ><br /><br />
        <input value="UPDATE" type="submit" @click=${this.updateBlog} />
      </form>
    </div> `;
  }
}

customElements.define("blog-update-view", BlogUpdate);
