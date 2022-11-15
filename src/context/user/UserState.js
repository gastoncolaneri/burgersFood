import UserContext from "./UserContext";
import UserActions from "./UserActions";

const UserState = (props) => {
  const { handleHasUser, handleShowMessageFor, hasUser, showMessageFor } =
    UserActions();

  const value = {
    handleHasUser,
    handleShowMessageFor,
    hasUser,
    showMessageFor,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserState;
