import { subsType } from "./../../global/interfaces";
import { TypeStyles } from "./../../styles/styles";
// import { render } from "ejs";

declare var CardElement: string;

const Card = (data: any, index: any) => {
  var cardContent = ejs.render(CardElement, { data, index });

  return cardContent;
};

export default Card;
