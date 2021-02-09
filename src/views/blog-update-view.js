import moment from "moment";
import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { updateBlog } from "../redux/actions.js";
import { ENDPOINTS } from "../constants/endpoints";
import { customStyles } from "../style/custom-style.js";

class BlogUpdate extends connect(store)(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      blog: { type: Object },
      description: { type: String },
      updateState: { type: Boolean },
      blog: { type: Object },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.blog = { title: "", description: "", image: "", createDate: "" };
    this.blogContentChange = this.blogContentChange.bind(this);
  }

  stateChanged(state) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.updateState = state.blog.updateLoading;
    this.blog = state.blog.blogs.find((blog) => blog.id == id);
  }

  blogContentChange(e, key) {
    this.blog = { ...this.blog, [key]: e.target.value };
  }

  updateBlog(e) {
    let blog = {
      ...this.blog,
      updateDate: moment().format("Do MMM YYYY"),
    };
    store.dispatch(updateBlog(blog)).then(() => {
      Router.go(ENDPOINTS.BLOG_LIST);
    });
  }

  render() {
    const { title, description, image } = this.blog;
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
            .value="${title}"
            placeholder="example@gmail.com"
            @keyup="${(e) => this.blogContentChange(e, "title")}"
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            outlined
            helperPersistent
            label="Image"
            icon="image"
            .value="${image}"
            @keyup="${(e) => this.blogContentChange(e, "image")}"
          ></mwc-textfield>
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            .value="${description}"
            @keyup="${(e) => this.blogContentChange(e, "description")}"
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled="${title ? false : true}"
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
