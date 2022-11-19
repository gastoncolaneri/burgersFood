import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import LocationContext from "../../../context/location/LocationContext";
import { Divider } from "primereact/divider";
import {
  LOCATION_DIALOG,
  DEFAULT_VALUES_LOCATION,
  OPTIONS_DELIVERY_INFO,
} from "../../../utils/constants";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const DialogFormLocation = ({ isOpen, setIsOpen, type }) => {
  const locationContext = useContext(LocationContext);
  const {
    addLocation,
    setDefaultLocation,
    modifyLocation,
    location,
    defaultLocation,
    setDeliveryInstructions,
  } = locationContext;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ DEFAULT_VALUES_LOCATION });
  const [optionDelivery, setOptionDelivery] = useState();

  const onSubmitLocation = (data) => {
    const tmpLocation = {
      address: data?.address,
      additionalInfo: data?.additionalInfo,
      zip: data?.zip,
      clarifications: data?.clarifications,
      label: data?.label,
    };
    if (!location.length) {
      addLocation(tmpLocation);
      setDefaultLocation(tmpLocation);
    } else {
      modifyLocation(defaultLocation?.id, tmpLocation);
      setDefaultLocation(tmpLocation);
    }

    setIsOpen(false);
  };

  const onSubmitDeliveryInfo = (data) => {
    const tmpDeliveryInstructions = {
      typeDelivery: data?.typeDelivery,
      clarificationsDelivery: data?.clarificationsDelivery,
    };
    setDeliveryInstructions(tmpDeliveryInstructions);
    setIsOpen(false);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <Dialog
      header="Detalles de la entrega"
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
    >
      {type === LOCATION_DIALOG ? (
        <form className="p-fluid">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-home" />
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "El domicilio es requerido",
                }}
                render={({ field }) => <InputText id={field.name} {...field} />}
              />
              <label
                htmlFor="address"
                className={classNames({ "p-error": !!errors.address })}
              >
                Domicilio
              </label>
            </span>
            {getFormErrorMessage("address")}
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-building" />
              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => <InputText id={field.name} {...field} />}
              />
              <label htmlFor="additionalInfo">Piso, departamento, bloque</label>
            </span>
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-map-marker" />
              <Controller
                name="zip"
                control={control}
                rules={{
                  required: "El código postal es requerido",
                }}
                render={({ field }) => <InputText id={field.name} {...field} />}
              />
              <label
                htmlFor="zip"
                className={classNames({ "p-error": !!errors.zip })}
              >
                Código postal
              </label>
            </span>
            {getFormErrorMessage("emailLogin")}
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <Controller
                name="clarifications"
                control={control}
                render={({ field }) => (
                  <InputTextarea id={field.name} {...field} />
                )}
              />
              <label htmlFor="clarifications">Aclaraciones adicionales</label>
            </span>
            {getFormErrorMessage("emailLogin")}
          </div>
          <Divider />
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-star-fill" />
              <Controller
                name="label"
                control={control}
                render={({ field }) => <InputText id={field.name} {...field} />}
              />
              <label htmlFor="label">Añadir una etiqueta (p. ej: casa)</label>
            </span>
            {getFormErrorMessage("emailLogin")}
          </div>
          <Button
            label="Guardar"
            onClick={handleSubmit(onSubmitLocation)}
            className="p-button"
            type="button"
          />
        </form>
      ) : (
        <form className="p-fluid">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <Controller
                name="typeDelivery"
                control={control}
                rules={{
                  required: "El tipo de entrega es requerido",
                }}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    options={OPTIONS_DELIVERY_INFO}
                    value={optionDelivery}
                    onChange={(e) => setOptionDelivery(e.value)}
                    placeholder="Tipo de entrega"
                    {...field}
                  />
                )}
              />
              <label
                htmlFor="typeDelivery"
                className={classNames({ "p-error": !!errors.typeDelivery })}
              ></label>
            </span>
            {getFormErrorMessage("typeDelivery")}
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <Controller
                name="clarificationsDelivery"
                control={control}
                render={({ field }) => (
                  <InputTextarea id={field.name} {...field} />
                )}
              />
              <label htmlFor="label">Aclaraciones adicionales</label>
            </span>
            {getFormErrorMessage("clarificationsDelivery")}
          </div>
          <Button
            label="Guardar"
            onClick={handleSubmit(onSubmitDeliveryInfo)}
            className="p-button"
            type="button"
          />
        </form>
      )}
    </Dialog>
  );
};

export default DialogFormLocation;
