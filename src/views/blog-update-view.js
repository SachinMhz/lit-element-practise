import moment from "moment";
import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store.js";
import { fetchBlog, updateBlog } from "../redux/blog-actions.js";
import { ENDPOINTS } from "../constants/endpoints";
import { customStyles } from "../style/custom-style.js";

class BlogUpdate extends connect(store)(LitElement) {
  static get properties() {
    return {
      blog: { type: Object },
      description: { type: String },
      updateState: { type: Boolean },
      imageBlob: { type: Object },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.imageBlob = null;
    this.blog = { title: "", description: "", createDate: "" };
    this.blogContentChange = this.blogContentChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    store.dispatch(fetchBlog(id));
  }

  stateChanged(state) {
    this.blog = state.blog.blog;
    this.updateState = state.blog.updateLoading;
  }

  blogContentChange(e, key) {
    this.blog = { ...this.blog, [key]: e.target.value };
  }

  updateBlog(e) {
    let blog = {
      ...this.blog,
      updateDate: moment().format("Do MMM YYYY"),
    };
    store.dispatch(updateBlog(blog, this.imageBlob)).then(() => {
      Router.go(ENDPOINTS.BLOG_LIST);
    });
  }

  render() {
    console.log("render");
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
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            .value="${description}"
            @keyup="${(e) => this.blogContentChange(e, "description")}"
          ></mwc-textarea>
          <paper-input-file
            label="Change Image"
            accept="image/*"
            @files-changed="${(file) => {
              this.imageBlob = file.detail.value[0];
            }}"
          ></paper-input-file>
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
