import "@vaadin/vaadin-checkbox";
import { connect } from "pwa-helpers";
import { html } from "@polymer/lit-element";

import { BaseView } from "../base-view";
import { store } from "../../redux/store";
import { updateTodoStatus } from "../../redux/actions.js";
import { getVisibleTodosSelector } from "../../redux/reducer";

class TodoList extends connect(store)(BaseView) {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  render() {
    return html`
      <div class="todos-list">
        ${this.todos.map(
          (todo) => html`<div class="todo-item">
            <vaadin-checkbox
              ?checked="${todo.complete}"
              @change="${(e) => this.updateTodoStatus(todo, e.target.checked)}"
            >
              ${todo.task}
            </vaadin-checkbox>
          </div>`
        )}
      </div>
    `;
  }
}

customElements.define("todo-list", TodoList);
