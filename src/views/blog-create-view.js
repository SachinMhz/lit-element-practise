import moment from "moment";
import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "lit-element";

import { store } from "../redux/store.js";
import { addBlog } from "../redux/actions.js";
import { ENDPOINTS } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";

class BlogCreate extends connect(store)(LitElement) {
  static get properties() {
    return {
      blog: { type: Object },
      addState: { type: Boolean },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.blog = { title: "", description: "", image: "" };
    this.addBlog = this.addBlog.bind(this);
    this.blogContentChange = this.blogContentChange.bind(this);
  }

  stateChanged(state) {
    this.addState = state.blog.addLoading;
  }

  blogContentChange(e, key) {
    this.blog = { ...this.blog, [key]: e.target.value };
  }

  addBlog(e) {
    e.preventDefault();
    let blog = {
      ...this.blog,
      createDate: moment().format("Do MMM YYYY"),
    };
    store.dispatch(addBlog(blog)).then(() => {
      Router.go(ENDPOINTS.BLOG_LIST);
    });
  }

  render() {
    const { title, description, image } = this.blog;
    return html`<div>
      <div class="wrapper">
        <h1>Create a new Blog</h1>
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
            type="password"
            @keyup="${(e) => this.blogContentChange(e, "description")}"
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled="${title ? false : true}"
            raised
            label="${this.addState ? "Creating ..." : "Create"}"
            @click="${this.addBlog}"
          ></mwc-button>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("blog-create-view", BlogCreate);
