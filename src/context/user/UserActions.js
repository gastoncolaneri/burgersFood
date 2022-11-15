import { useReducer } from "react";
import userReducer, { userInitialState } from "./userReducer";
import { HAS_USER, SHOW_MESSAGE_FOR } from "../types";

const UserActions = () => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const handleHasUser = (userStatus) => {
    dispatch({
      type: HAS_USER,
      payload: userStatus,
    });
  };

  const handleShowMessageFor = (messageType) => {
    dispatch({
      type: SHOW_MESSAGE_FOR,
      payload: messageType,
    });
  };
  return {
    hasUser: state.HAS_USER,
    showMessageFor: state.showMessageFor,
    handleHasUser,
    handleShowMessageFor,
  };
};

export default UserActions;
