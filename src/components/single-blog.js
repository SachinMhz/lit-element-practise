import { Router } from "@vaadin/router";
import { css, html, LitElement } from "@polymer/lit-element";

import { store } from "../redux/store";
import { ENDPOINT } from "../constants/endpoints";
import { customStyles, singleBlogStyle } from "../style/custom-style";
import { deleteBlog, fetchBlog } from "../redux/actions";

class SingleBlog extends LitElement {
  static get properties() {
    return {
      blog: { type: Object },
    };
  }

  static get styles() {
    return [
      singleBlogStyle,
      css`
        a {
          text-decoration: none;
          color: black;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.editBlog = this.editBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
  }

  deleteBlog(e) {
    e.preventDefault();
    store.dispatch(deleteBlog(this.blog));
    store.dispatch(fetchBlog());
  }

  editBlog(e) {
    e.preventDefault();
    Router.go(ENDPOINT.UPDATE + "?id=" + this.blog.id);
  }

  render() {
    return html`
      <a href=${`/blog?id=${this.blog.id}`}>
        <div
          class="single-blog"
          style="padding:16px; border:1px solid black; margin:8px"
        >
          <div
            class="d-flex"
            style="display:flex; justify-content: space-between;"
          >
            <div style="padding-right:24px; flex:1;">
              <h3 class="single-blog-title" style="margin:0; padding:0">
                ${this.blog.title}
              </h3>
              <p style="flex:1;">${this.blog.description}</p>
              <div style="display:flex; justify-content: space-between;">
                <span>User: Sachin Maharjan</span
                ><span>Create Date: ${this.blog.createDate}</span>
              </div>
            </div>
            <div>
              <img
                src=${this.blog.image ||
                "https://thumbs.dreamstime.com/b/black-linear-photo-camera-logo-like-no-image-available-black-linear-photo-camera-logo-like-no-image-available-flat-stroke-style-106031126.jpg"}
                alt="City Image"
                width="250"
                height="250"
              />
            </div>
          </div>
          <mwc-button
            class="button"
            raised
            label="Edit"
            @click="${this.editBlog}"
          ></mwc-button>
          <mwc-button
            class="button"
            raised
            label="Delete"
            @click="${this.deleteBlog}"
          ></mwc-button>
        </div>
      </a>
    `;
  }
}

customElements.define("single-blog", SingleBlog);
