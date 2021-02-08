import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { updateBlog } from "../redux/actions.js";
import { ENDPOINT } from "../constants/endpoints";
import { customStyles } from "../style/custom-style.js";

class BlogUpdate extends connect(store)(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      blog: { type: Object },
      description: { type: String },
      updateState: { type: Boolean },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.blog = { title: "", description: "", image: "", createDate: "" };

    this.updateBlog = this.updateBlog.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
  }

  stateChanged(state) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.updateState = state.blog.updateLoading;
    this.blog = state.blog.blogs.find((blog) => blog.id == id);
    console.log(this.blog);

    this.title = this.blog?.title;
    this.description = this.blog?.description;
    this.image = this.blog?.image;
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
    let blog = {
      id: this.blog.id,
      title: this.title,
      description: this.description,
      image: this.image,
    };
    store.dispatch(updateBlog(blog)).then(() => {
      Router.go(ENDPOINT.BLOG_LIST);
    });
  }

  render() {
    return html`<div>
      <div class="wrapper">
        <h1>Update Blog</h1>
        <div class="container">
          <mwc-textfield
            class="textfield"
            required
            outlined
            label="Title"
            icon="title"
            .value="${this.title}"
            placeholder="example@gmail.com"
            @keyup="${this.titleChange}"
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            outlined
            helperPersistent
            label="Image"
            icon="image"
            .value="${this.image}"
            placeholder="example@gmail.com"
            @keyup="${this.imageChange}"
          ></mwc-textfield>
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            .value="${this.description}"
            @keyup="${this.descriptionChange}"
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled="${this.title ? false : true}"
            raised
            .label="${this.updateState ? "Updating ..." : "Update"}"
            @click="${this.updateBlog}"
          ></mwc-button>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("blog-update-view", BlogUpdate);
