import { removeDublicateAlerts } from "./globalfunction";
const INNITIAL_STATE = [];

const alert = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return [...state, action.payload];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return [...state];
  }
};

export default alert;
