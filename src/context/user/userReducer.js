import { HAS_USER, SHOW_MESSAGE_FOR } from "../types";

export const userInitialState = {
  hasUser: false,
  showMessageFor: "",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case HAS_USER:
      return { ...state, hasUser: payload };
    case SHOW_MESSAGE_FOR:
      return { ...state, showMessageFor: payload };

    default:
      return state;
  }
};

export default userReducer;
