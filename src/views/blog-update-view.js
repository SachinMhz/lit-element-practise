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
      updateState: { type: Boolean },
    };
  }

  constructor() {
    super();
  }

  stateChanged(state) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.updateState = state.blog.updateLoading;
    this.blog = state.blog.blogs.find((blog) => blog.id == id);

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
      store.dispatch(updateBlog(blog)).then(() => {
        window.location.href = "http://localhost:8080/blogs";
      });
    }
  }

  render() {
    return html`<div>
      <style>
        mwc-textfield {
          --mdc-theme-primary: rgb(42, 52, 67);
        }
        mwc-textarea {
          --mdc-theme-primary: rgb(42, 52, 67);
        }
        mwc-button {
          --mdc-theme-primary: rgb(42, 52, 67);
          --mdc-theme-on-primary: white;
        }
        .wrapper {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .container {
          display: flex;
          width: 40vw;
          min-width: 300px;
          align-items: center;
          flex-direction: column;
        }
        .textfield {
          width: 100%;
          padding: 10px 0;
        }
        .textarea {
          width: 100%;
          padding: 10px 0;
        }
        .button {
          margin-top: 15px;
          width: 100%;
        }
      </style>
      <div class="wrapper">
        <h1>Update Blog</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Title"
            icon="title"
            value=${this.blog.title}
            placeholder="example@gmail.com"
            @keyup=${this.titleChange}
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            outlined
            helperPersistent
            label="Image"
            icon="image"
            value=${this.blog.image}
            placeholder="example@gmail.com"
            @keyup=${this.imageChange}
          ></mwc-textfield>
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            value=${this.blog.description}
            @keyup=${this.descriptionChange}
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled=${this.title ? false : true}
            raised
            label=${this.updateState ? "Creating ..." : "Create"}
            @click=${this.updateBlog}
          ></mwc-button>
        </div>
      </div>
    </div> `;
  }

  render() {
    return html`<div>
      <style>
        mwc-textfield {
          --mdc-theme-primary: rgb(42, 52, 67);
        }
        mwc-textarea {
          --mdc-theme-primary: rgb(42, 52, 67);
        }
        mwc-button {
          --mdc-theme-primary: rgb(42, 52, 67);
          --mdc-theme-on-primary: white;
        }
        .wrapper {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .container {
          display: flex;
          width: 40vw;
          min-width: 300px;
          align-items: center;
          flex-direction: column;
        }
        .textfield {
          width: 100%;
          padding: 10px 0;
        }
        .textarea {
          width: 100%;
          padding: 10px 0;
        }
        .button {
          margin-top: 15px;
          width: 100%;
        }
      </style>
      <div class="wrapper">
        <h1>Update Blog</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Title"
            icon="title"
            value=${this.blog.title}
            placeholder="example@gmail.com"
            @keyup=${this.titleChange}
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            outlined
            helperPersistent
            label="Image"
            icon="image"
            value=${this.blog.image}
            placeholder="example@gmail.com"
            @keyup=${this.imageChange}
          ></mwc-textfield>
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            value=${this.blog.description}
            @keyup=${this.descriptionChange}
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled=${this.title ? false : true}
            raised
            label=${this.updateState ? "Updating ..." : "Update"}
            @click=${this.updateBlog}
          ></mwc-button>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("blog-update-view", BlogUpdate);
