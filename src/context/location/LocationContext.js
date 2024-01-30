import { createContext } from "react";
import { locationInitialState } from "./locationReducer";

const LocationContext = createContext(locationInitialState);

export default LocationContext;
