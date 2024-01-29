import LocationActions from "./LocationActions";
import LocationContext from "./LocationContext";

const LocationState = (props) => {
  const {
    addLocation,
    modifyLocation,
    setDefaultLocation,
    setDeliveryInstructions,
    setDeliveryType,
    deliveryInstructions,
    locations,
    defaultLocation,
    deliveryType,
  } = LocationActions();

  const value = {
    addLocation,
    modifyLocation,
    setDefaultLocation,
    setDeliveryInstructions,
    setDeliveryType,
    deliveryInstructions,
    locations,
    defaultLocation,
    deliveryType,
  };

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
