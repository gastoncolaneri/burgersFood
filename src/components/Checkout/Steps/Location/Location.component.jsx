import { useContext, useState, useMemo } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Divider } from "primereact/divider";
import {
  A_DOMICILIO,
  LOCATION_DIALOG,
  DELIVERY_INFO_DIALOG,
  DELIVERY_TYPE,
} from "../../../../utils/constants";
import DialogFormLocation from "../../DialogFormLocation/DialogFormLocation";
import LocationContext from "../../../../context/location/LocationContext";

import "./location.styles.css";

const Location = () => {
  const locationContext = useContext(LocationContext);
  const {
    location,
    defaultLocation,
    deliveryInstructions,
    setDeliveryType,
    deliveryType,
  } = locationContext;
  const [isOpen, setIsOpen] = useState(false);
  const [typeDialog, setTypeDialog] = useState(LOCATION_DIALOG);

  const buttonLocation = useMemo(() => {
    return (
      <div className="button-location__container">
        <Button
          onClick={() => {
            setIsOpen(true);
            setTypeDialog(LOCATION_DIALOG);
          }}
          label={location.length ? "Editar" : "Crear"}
          style={{ width: "60px" }}
          className="p-button-sm p-button-rounded p-1"
        />
      </div>
    );
  }, [location.length]);
  return (
    <div className="location__container">
      <SelectButton
        value={deliveryType}
        options={DELIVERY_TYPE}
        onChange={(e) => setDeliveryType(e.value)}
        className="location__options"
      />
      {deliveryType === A_DOMICILIO ? (
        <div>
          {location.length ? (
            <div className="location-info__container">
              <div className="location-icon__container">
                <i className="pi pi-map-marker location__icon" />
              </div>
              <div className="location__info">
                <span className="location-info__title">
                  {defaultLocation?.address}
                  {defaultLocation?.label && ` - ${defaultLocation?.label}`}
                </span>
                <span className="location-info__address">
                  {defaultLocation?.additionalInfo}
                </span>
              </div>
              {buttonLocation}
            </div>
          ) : (
            <div className="location-info__container">
              <div className="location-icon__container">
                <i className="pi pi-map-marker location__icon" />
              </div>
              <div className="location__info">
                <span className="location-info__title">
                  No hay direcciones cargadas
                </span>
              </div>
              {buttonLocation}
            </div>
          )}
          <Divider />
          {deliveryInstructions ? (
            <div className="location-info__container">
              <div className="location-icon__container">
                <i className="pi pi-question-circle location__icon" />
              </div>
              <div className="location__info">
                <span className="location-info__title">
                  {deliveryInstructions?.typeDelivery}
                </span>
                <span className="location-info__address">
                  {deliveryInstructions?.clarificationsDelivery}
                </span>
              </div>
              <div className="button-location__container">
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setTypeDialog(DELIVERY_INFO_DIALOG);
                  }}
                  label="Editar"
                  style={{ width: "60px" }}
                  className="p-button-sm p-button-rounded p-1"
                />
              </div>
            </div>
          ) : (
            <div className="location-info__container">
              <div className="location-icon__container">
                <i className="pi pi-question-circle location__icon" />
              </div>
              <div className="location__info">
                <span className="location-info__title">
                  No hay instrucciones de entrega cargadas
                </span>
              </div>
              <div className="button-location__container">
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setTypeDialog(DELIVERY_INFO_DIALOG);
                  }}
                  label={deliveryInstructions ? "Editar" : "Crear"}
                  style={{ width: "60px" }}
                  className="p-button-sm p-button-rounded p-1"
                />
              </div>
            </div>
          )}
          <Divider />
        </div>
      ) : (
        <>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="100%"
                height="300"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=P%C3%A7a.%20de%20la%20Reina,%2020,%2046003%20Val%C3%A8ncia,%20Valencia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                title="location-map"
              ></iframe>
            </div>
          </div>
          <div className="location-info__container">
            <div className="location-icon__container">
              <i className="pi pi-home location__icon" />
            </div>
            <div className="location__info">
              <span className="location-info__title">Burger Foods</span>
              <span className="location-info__address">
                Pça. de la Reina, 20, 46003 València, Valencia
              </span>
            </div>
          </div>
          <Divider />
        </>
      )}
      <div className="delay__container">
        <span className="delay__text">
          Tiempo estimado de
          {deliveryType === A_DOMICILIO ? " entrega" : " recogida"}:
        </span>
        <span className="delay__text">Entre 15 y 25 minutos</span>
      </div>
      <DialogFormLocation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type={typeDialog}
      />
    </div>
  );
};

export default Location;
