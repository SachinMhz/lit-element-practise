import { html } from "@polymer/lit-element";

import { store } from "../redux/store";
import { deleteBlog, fetchBlog } from "../redux/actions";
import { BaseView } from "../components/base-view";

class SingleBlog extends BaseView {
  static get properties() {
    return {
      blog: { type: Object },
    };
  }

  deleteBlog(e) {
    e.preventDefault();
    store.dispatch(deleteBlog(this.blog));
    store.dispatch(fetchBlog());
  }

  editBlog(e) {
    e.preventDefault();
    window.location.href = "http://localhost:8080/update?id=" + this.blog.id;
  }

  render() {
    return html`
      <style>
        a {
          text-decoration: none;
          color: black;
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
      </style>
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
            @click=${this.editBlog}
          ></mwc-button>
          <mwc-button
            class="button"
            raised
            label="Delete"
            @click=${this.deleteBlog}
          ></mwc-button>
        </div>
      </a>
    `;
  }
}

customElements.define("single-blog", SingleBlog);
