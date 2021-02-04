import firebase from "firebase";
import { Router } from "@vaadin/router";

import "./styles.css";
import "./views/blogs-view";
import "./components/nav-bar";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA8c6rDQGhi1jb9EOt-CQRd4rZ-0o86OK0",
  authDomain: "simple-blog-app-c1997.firebaseapp.com",
  databaseURL: "https://simple-blog-app-c1997.firebaseio.com",
  projectId: "simple-blog-app-c1997",
  storageBucket: "simple-blog-app-c1997.appspot.com",
  messagingSenderId: "412637583677",
  appId: "1:412637583677:web:7c1cb640f58004e36c0d54",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.addEventListener("load", () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    // {
    //   path: "/",
    //   component: "blogs-view",
    //   children: [
    //     {
    //       path: "blogs",
    //       component: "blogs-view",
    //       action: async () => {
    //         await import("./views/blogs-view");
    //       },
    //       children: [
    //         {
    //           path: "",
    //           redirect: "/blogs",
    //         },
    //         {
    //           path: "create",
    //           component: "blog-create-view",
    //           action: async () => {
    //             await import("./views/blog-create-view");
    //           },
    //         },
    //         {
    //           path: "/:id",
    //           component: "blog-detail-view",
    //           action: async () => {
    //             await import("./views/blog-detail-view");
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      path: "/",
      component: "login-view",
      action: async () => {
        await import("./views/login-view");
      },
    },
    {
      path: "/sign-in",
      component: "signin-view",
      action: async () => {
        await import("./views/signin-view");
      },
    },
    {
      path: "/blogs",
      component: "blogs-view",
      action: () =>
        import(/* webpackChunkName: "blogs" */ "./views/blogs-view"), //
    },
    {
      path: "/blog",
      component: "blog-detail-view",
      action: () =>
        import(/* webpackChunkName: "stats" */ "./views/blog-detail-view"), //
    },
    {
      path: "/create",
      component: "blog-create-view",
      action: () =>
        import(/* webpackChunkName: "stats" */ "./views/blog-create-view"), //
    },
    {
      path: "/update",
      component: "blog-update-view",
      action: () =>
        import(/* webpackChunkName: "stats" */ "./views/blog-update-view"), //
    },
    {
      path: "(.*)",
      component: "not-found-view",
      action: () =>
        import(
          /* webpackChunkName: "not-found-view" */ "./views/not-found-view"
        ),
    },
  ]);
}
