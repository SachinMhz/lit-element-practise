import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-text-field";
import { connect } from "pwa-helpers";
import { html } from "@polymer/lit-element";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";

import "./todo-list";
import "./todo-filters";
import { BaseView } from "./base-view";
import { store } from "../redux/store.js";
import { addTodo } from "../redux/actions.js";
import { getVisibleTodosSelector } from "../redux/reducer";
class TodoView extends connect(store)(BaseView) {
  static get properties() {
    return {
      task: { type: String },
    };
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.task = "";
    }
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  onChangeTask(e) {
    this.task = e.target.value;
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
        todo-view .input-layout {
          width: 100%;
          display: flex;
        }
        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }
        todo-view .todos-list {
          margin-top: var(--spacing);
        }
        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>

      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task || ""}"
          @change="${this.onChangeTask}"
        >
        </vaadin-text-field>

        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>

      <todo-list></todo-list>

      <todo-filters></todo-filters>
    `;
  }
}

customElements.define("todo-view", TodoView);
