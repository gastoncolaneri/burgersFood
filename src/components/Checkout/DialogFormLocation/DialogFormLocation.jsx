import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import LocationContext from "../../../context/location/LocationContext";
import {
  LOCATION_DIALOG,
  DEFAULT_VALUES_LOCATION,
  OPTIONS_DELIVERY_INFO,
  NEW_DIALOG,
  EDIT_DIALOG,
} from "../../../utils/constants";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import NewLocation from "../NewLocation/NewLocation";
import EditLocation from "../EditLocation/EditLocation";

const DialogFormLocation = ({ isOpen, setIsOpen, typeDialog }) => {
  const locationContext = useContext(LocationContext);
  const { locations, setDeliveryInstructions } = locationContext;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ DEFAULT_VALUES_LOCATION });
  const [optionDelivery, setOptionDelivery] = useState();

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
      header={
        locations.length > 1 && typeDialog === LOCATION_DIALOG
          ? "Mis direcciones"
          : "Detalles de la entrega"
      }
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
    >
      {typeDialog === LOCATION_DIALOG ? (
        locations?.length > 1 ? (
          <EditLocation />
        ) : (
          <NewLocation
            typeSubmit={locations?.length ? EDIT_DIALOG : NEW_DIALOG}
            setIsOpen={setIsOpen}
          />
        )
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
