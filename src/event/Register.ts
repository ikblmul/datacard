import Search from "./container/search";

export interface RegisterEventProps {
  selector: string;
  closure: (
    event: JQuery.TriggeredEvent<
      HTMLElement,
      undefined,
      HTMLElement,
      HTMLElement
    >
  ) => void;
  type: "change" | "input" | string;
}

const register: RegisterEventProps[] = [Search];

export default class RegisterEvent {
  register() {
    register.forEach((regEvent) =>
      $(regEvent.selector).on(regEvent.type, regEvent.closure)
    );

    console.log("All Event Has Been Registred");
  }

  DebugMode(regEvent, closure) {
    console.log(regEvent);
  }
}
