import { RegisterEventProps } from "./Register";

type Constructor<T> = new (...args: any[]) => T;
export type evt<T> = JQuery.TriggeredEvent<T, undefined, T, T>;
export interface EventHandler {
  type: string;
  selector: string;
  closure: () => (event: evt<HTMLElement>) => void;
}

const Registry = (
  RegisterClass: Constructor<EventHandler>
): RegisterEventProps => {
  const cls = new RegisterClass();

  return {
    closure: cls.closure(),
    selector: cls.selector,
    type: cls.type,
  };
};

export default Registry;
