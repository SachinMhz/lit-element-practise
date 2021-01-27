import { html } from "lit-element";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { statsSelector } from "../redux/reducer.js";

import { BaseView } from "./base-view.js";

class StatsView extends connect(store)(BaseView) {
  render() {
    return html` <div>this is a stats page view</div> `;
  }
}

customElements.define("stats-view", StatsView);
