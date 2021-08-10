import DataCard from "./Components/DataCard";
import RegisterEvent from "./event/Register";
import RequestAJAX from "./http/request";

declare var CardElement: String;
declare var CardElement: String;

// setting up ajax header alongside token
RequestAJAX.setup();

// Registry Event That Run on window load
new RegisterEvent().register();

window["DataCard"] = new DataCard($("#content"));
