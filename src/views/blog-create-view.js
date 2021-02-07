import { html } from "@polymer/lit-element";
import { connect } from "pwa-helpers";

import { store } from "../redux/store.js";
import { addBlog } from "../redux/actions.js";
import { BaseView } from "../components/base-view";

import moment from "moment";
class BlogCreate extends connect(store)(BaseView) {
  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      description: { type: String },
      addState: { type: Boolean },
      createDate: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.image = "";
    this.createDate = "";
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
    if (this.title && this.description) {
      let blog = {
        title: this.title,
        description: this.description,
        image: this.image,
        createDate: moment().format("Do MMM YYYY"),
      };
      store.dispatch(addBlog(blog)).then(() => {
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
