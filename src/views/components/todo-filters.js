import { connect } from "pwa-helpers";
import { html } from "@polymer/lit-element";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";

import { BaseView } from "../base-view";
import { store } from "../../redux/store.js";
import { VisibilityFilters } from "../../redux/reducer";
import { updateFilter, clearCompleted } from "../../redux/actions.js";

class TodoFilters extends connect(store)(BaseView) {
  static get properties() {
    return {
      filter: { type: String },
    };
  }

  stateChanged(state) {
    this.filter = state.filter;
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  render() {
    return html`<vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${Object.values(VisibilityFilters).map(
          (filter) => html` <vaadin-radio-button value="${filter}">
            ${filter}
          </vaadin-radio-button>`
        )}
      </vaadin-radio-group>
      <vaadin-button @click="${this.clearCompleted}">
        Clear completed
      </vaadin-button>`;
  }
}

customElements.define("todo-filters", TodoFilters);
