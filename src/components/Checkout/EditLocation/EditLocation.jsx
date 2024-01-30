import { useContext, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import LocationContext from "../../../context/location/LocationContext";

const EditLocation = () => {
  const locationContext = useContext(LocationContext);
  const { locations } = locationContext;
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  return (
    <div>
      <h5>Direcciones guardadas</h5>
      {locations.map((loc) => {
        return (
          <div key={loc.address} className="field-radiobutton">
            <RadioButton
              inputId={loc.address}
              name="category"
              value={loc}
              onChange={(e) => setSelectedLocation(e.value)}
              checked={selectedLocation.address === loc.address}
            />
            <label htmlFor={loc.address}>{loc.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default EditLocation;
