import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import LocationContext from "../../../context/location/LocationContext";
import {
  DEFAULT_VALUES_LOCATION,
  EDIT_DIALOG,
  NEW_DIALOG,
} from "../../../utils/constants";

const NewLocation = ({ typeSubmit, setIsOpen }) => {
  const locationContext = useContext(LocationContext);
  const { locations, addLocation, setDefaultLocation, modifyLocation } =
    locationContext;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: locations?.length ? locations[0] : DEFAULT_VALUES_LOCATION,
  });

  const onSubmit = (data) => {
    const tmpLocation = {
      address: data?.address,
      additionalInfo: data?.additionalInfo,
      zip: data?.zip,
      clarifications: data?.clarifications,
      label: data?.label,
    };
    if (typeSubmit === NEW_DIALOG) {
      addLocation(tmpLocation);
      setDefaultLocation(tmpLocation);
    }
    if (typeSubmit === EDIT_DIALOG) {
      modifyLocation(tmpLocation);
      setDefaultLocation(tmpLocation);  
    }
    setIsOpen(false);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
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
            render={({ field }) => <InputTextarea id={field.name} {...field} />}
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
        onClick={handleSubmit(onSubmit)}
        className="p-button"
        type="button"
      />
    </form>
  );
};

export default NewLocation;
