import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-text-field";
import { connect } from "pwa-helpers";
import { html } from "@polymer/lit-element";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";

import "./todo-filters";
import { BaseView } from "./base-view";
import { store } from "../redux/store.js";
import { getVisibleTodosSelector } from "../redux/reducer";
import { addTodo, updateTodoStatus } from "../redux/actions.js";

class TodoView extends connect(store)(BaseView) {
  static get properties() {
    return {
      todos: { type: Array },
      task: { type: String },
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
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

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  renderTodoItem(todo) {
    return html`
      <div class="todo-item">
        <vaadin-checkbox
          ?checked="${todo.complete}"
          @change="${(e) => this.updateTodoStatus(todo, e.target.checked)}"
        >
          ${todo.task}
        </vaadin-checkbox>
      </div>
    `;
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
          @change="${this.updateTask}"
        >
        </vaadin-text-field>

        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>
      <div class="todos-list">
        ${this.todos.map((todo) => this.renderTodoItem(todo))}
      </div>

      <todo-filters></todo-filters>
    `;
  }
}

customElements.define("todo-view", TodoView);
