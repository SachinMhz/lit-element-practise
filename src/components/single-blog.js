import { html } from "@polymer/lit-element";

import { deleteBlog } from "../redux/actions";
import { BaseView } from "../components/base-view";
import { store } from "../redux/store";

class SingleBlog extends BaseView {
  static get properties() {
    return {
      blog: { type: Object },
    };
  }

  deleteBlog(e) {
    const firebase = window.firebase;
    console.log(firebase);
    e.preventDefault();
    // store.dispatch(deleteBlog(this.blog.id));
    console.log("delete clicked");
  }
  editBlog(e) {
    e.preventDefault();
    window.location.href = "http://localhost:8080/update?id=" + this.blog.id;
    console.log("update clicked");
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
                ><span>Create Date: 20th Jan 2021</span>
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
          <button @click=${this.editBlog}>Edit</button>
          <button @click=${this.deleteBlog}>Delete</button>
        </div>
      </a>
    `;
  }
}

customElements.define("single-blog", SingleBlog);
