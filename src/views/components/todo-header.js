import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field";
import { connect } from "pwa-helpers";
import { html } from "@polymer/lit-element";

import { BaseView } from "../base-view";
import { store } from "../../redux/store.js";
import { addTodo } from "../../redux/actions.js";

class TodoHeader extends connect(store)(BaseView) {
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
    `;
  }
}

customElements.define("todo-header", TodoHeader);
