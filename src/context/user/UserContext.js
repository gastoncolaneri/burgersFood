import { createContext } from "react";
import { userInitialState } from "./userReducer";

const UserContext = createContext(userInitialState);

export default UserContext;
