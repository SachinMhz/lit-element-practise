import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { addBlog } from "../redux/actions.js";
import { BaseView } from "../components/base-view";

class BlogCreate extends connect(store)(BaseView) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      Description: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.image = "";
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

  addBlog(e) {
    e.preventDefault();
    if (this.title && this.description) {
      let blog = {
        title: this.title,
        description: this.description,
        image: this.image,
      };
      store.dispatch(addBlog(blog));
      this.title = "";
      this.image = "";
      this.description = "";
    }
  }

  render() {
    return html`<div>
      <h2>Create a new Blog</h2>
      <form action="">
        <label for="title">Title:</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value=${this.title}
          @keyup=${this.titleChange}
        /><br />
        <label for="image">Image URL:</label><br />
        <input
          type="text"
          id="image"
          name="image"
          value=${this.image}
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
${this.description}</textarea
        ><br /><br />
        <input value="ADD" type="submit" @click=${this.addBlog} />
      </form>
    </div> `;
  }
}

customElements.define("blog-create-view", BlogCreate);
