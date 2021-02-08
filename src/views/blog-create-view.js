import moment from "moment";
import { connect } from "pwa-helpers";
import { Router } from "@vaadin/router";
import { html, LitElement } from "lit-element";

import { store } from "../redux/store.js";
import { addBlog } from "../redux/actions.js";
import { ENDPOINT } from "../constants/endpoints.js";
import { customStyles } from "../style/custom-style.js";
class BlogCreate extends connect(store)(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      description: { type: String },
      addState: { type: Boolean },
      createDate: { type: String },
    };
  }

  static get styles() {
    return [customStyles];
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.image = "";
    this.createDate = "";

    this.addBlog = this.addBlog.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
  }

  stateChanged(state) {
    this.addState = state.blog.addLoading;
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
    let blog = {
      title: this.title,
      description: this.description,
      image: this.image,
      createDate: moment().format("Do MMM YYYY"),
    };
    store.dispatch(addBlog(blog)).then(() => {
      Router.go(ENDPOINT.BLOG_LIST);
    });
  }

  render() {
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
            value=${this.title}
            placeholder="example@gmail.com"
            @keyup=${this.titleChange}
          ></mwc-textfield>
          <mwc-textfield
            class="textfield"
            outlined
            helperPersistent
            label="Image"
            icon="image"
            value=${this.image}
            placeholder="example@gmail.com"
            @keyup=${this.imageChange}
          ></mwc-textfield>
          <mwc-textarea
            class="textfield"
            outlined
            rows="8"
            label="Description"
            icon="vpn_key"
            value=${this.description}
            type="password"
            @keyup=${this.descriptionChange}
          ></mwc-textarea>
          ${this.error ? html`<div class="error">${this.error}</div>` : null}
          <mwc-button
            class="button"
            ?disabled=${this.title ? false : true}
            raised
            label=${this.addState ? "Creating ..." : "Create"}
            @click=${this.addBlog}
          ></mwc-button>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("blog-create-view", BlogCreate);
