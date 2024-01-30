import { useReducer } from "react";
import locationReducer, { locationInitialState } from "./locationReducer";
import {
  ADD_LOCATION,
  MODIFY_LOCATION,
  SET_DELIVERY_INSTRUCTIONS,
  SET_DEFAULT_LOCATION,
  SET_DELIVERY_TYPE,
} from "../types";

const LocationActions = () => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);

  const addLocation = (locationToAdd) => {
    const tmpLocations = state.locations;
    const id = state.locations.length + 1;
    tmpLocations.push({ ...locationToAdd, id });
    dispatch({
      type: ADD_LOCATION,
      payload: tmpLocations,
    });
  };
  const setDefaultLocation = (defaultLocation) => {
    dispatch({
      type: SET_DEFAULT_LOCATION,
      payload: defaultLocation,
    });
  };
  const modifyLocation = (locationModified) => {
    const tmpLocations = state.locations.map((item) => {
      if (item?.id === 1) {
        return locationModified;
      }
      return item;
    });
    dispatch({
      type: MODIFY_LOCATION,
      payload: tmpLocations,
    });
  };
  const setDeliveryInstructions = (deliveryInstructions) => {
    dispatch({
      type: SET_DELIVERY_INSTRUCTIONS,
      payload: deliveryInstructions,
    });
  };

  const setDeliveryType = (deliveryType) => {
    dispatch({
      type: SET_DELIVERY_TYPE,
      payload: deliveryType,
    });
  };

  return {
    locations: state.locations,
    deliveryInstructions: state.deliveryInstructions,
    defaultLocation: state.defaultLocation,
    deliveryType: state.deliveryType,
    addLocation,
    setDefaultLocation,
    modifyLocation,
    setDeliveryInstructions,
    setDeliveryType,
  };
};

export default LocationActions;
