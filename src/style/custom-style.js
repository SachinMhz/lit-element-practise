import { css } from "@polymer/lit-element";

export const customStyles = css`
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
  .error {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 13px;
  }
  .user-info {
    display: flex;
    justify-content: space-between;
  }
  .blog-content {
    display: flex;
    justify-content: center;
  }
`;

export const navBarStyle = css`
  .nav-bar-wrapper {
    background: rgb(42, 52, 67);
    padding: 12px 0px;
  }
  a {
    font-size: 32px;
    color: white;
    margin: 0 20px;
  }
`;

export const singleBlogStyle = css`
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
`;
