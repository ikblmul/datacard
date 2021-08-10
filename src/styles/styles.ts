import { subsType } from "../global/interfaces";

export const TypeStyles = (type: subsType) => {
  let styles = "px-2 py-1 rounded ";
  switch (type) {
    case "Low":
      styles += "bg-dark";
      break;
    case "Medium":
      styles += "bg-success";
      break;
    case "High":
      styles += "bg-primary";
      break;
  }
  return styles;
};
