import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field";
import { html } from "@polymer/lit-element";

import "./components/todo-list";
import "./components/todo-header";
import "./components/todo-filters";
import { BaseView } from "./base-view";

class TodoView extends BaseView {
  render() {
    return html`
      <todo-header></todo-header>

      <todo-list></todo-list>

      <todo-filters></todo-filters>
    `;
  }
}

customElements.define("todo-view", TodoView);
