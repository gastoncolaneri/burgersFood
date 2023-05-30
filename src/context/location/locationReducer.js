import { DELIVERY_TYPE } from "../../utils/constants";
import {
  ADD_LOCATION,
  MODIFY_LOCATION,
  SET_DEFAULT_LOCATION,
  SET_DELIVERY_INSTRUCTIONS,
  SET_DELIVERY_TYPE,
} from "../types";

export const locationInitialState = {
  locations: [],
  defaultLocation: null,
  deliveryInstructions: null,
  deliveryType: DELIVERY_TYPE[0],
};

const locationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LOCATION:
      return { ...state, locations: payload };
    case SET_DEFAULT_LOCATION:
      return { ...state, defaultLocation: payload };
    case MODIFY_LOCATION:
      return { ...state, locations: payload };
    case SET_DELIVERY_INSTRUCTIONS:
      return { ...state, deliveryInstructions: payload };
    case SET_DELIVERY_TYPE:
      return { ...state, deliveryType: payload };
    default:
      return state;
  }
};

export default locationReducer;
