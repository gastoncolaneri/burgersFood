import LocationActions from "./LocationActions";
import LocationContext from "./LocationContext";

const CartState = (props) => {
  const {
    addLocation,
    modifyLocation,
    setDefaultLocation,
    setDeliveryInstructions,
    setDeliveryType,
    deliveryInstructions,
    location,
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
    location,
    defaultLocation,
    deliveryType,
  };

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default CartState;
