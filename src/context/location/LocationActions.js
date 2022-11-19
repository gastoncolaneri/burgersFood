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
    const tmpLocations = state.location;
    const id = state.location.length + 1;
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
  const modifyLocation = (id, locationModified) => {
    const tmpLocations = state.location.map((item) => {
      if (item?.id === id) {
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
    location: state.location,
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
