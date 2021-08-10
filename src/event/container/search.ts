import Registry, { EventHandler, evt } from "../eventHandler";

class SearchEvent implements EventHandler {
  type = "input";
  selector = "#crudTable_filter input";
  delayTyping = 300;
  TimeoutContainer = setTimeout(() => {}, 0);

  Input(event: evt<HTMLInputElement>) {
    const val = event.target.value;

    window["DataCard"].ajax(null, val);
  }

  closure() {
    return this.DelayInput.bind(this);
  }

  /**
   * Event Delaying Input
   *
   */
  DelayInput(event: evt<HTMLInputElement>) {
    clearTimeout(this.TimeoutContainer);

    // can call this references from this class
    const input = this.Input.bind(this, event);

    this.TimeoutContainer = setTimeout(() => input(), this.delayTyping);
  }
}

const Search = Registry(SearchEvent);

export default Search;
