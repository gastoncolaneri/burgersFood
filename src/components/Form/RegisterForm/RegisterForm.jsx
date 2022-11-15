import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";
import { classNames } from "primereact/utils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../utils/Firebase";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";

const RegisterForm = ({ setHasUser }) => {
  const auth = getAuth(app);
  const toast = useRef(null);
  const defaultValues = {
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    dateRegister: null,
    acceptRegister: false,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const [isLoading, setIsLoading] = useState(false);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmitRegister = (data) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(
      auth,
      data?.emailRegister,
      data?.passwordRegister
    )
      .then((userCredential) => {
        toast.current.show({
          severity: "success",
          summary: "Registro exitoso",
          detail: "Su cuenta ha sido creada correctamente.",
          life: 5000,
        });
        setIsLoading(false);
        reset();
      })
      .catch((e) => {
        setIsLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error al registrarse",
          detail:
            "El correo electrónico ya se encuentra en uso. Por favor, escoja otro.",
          life: 5000,
        });
      });
  };

  const passwordHeader = <h6>Escoja su contraseña</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una letra minúscula</li>
        <li>Al menos una letra mayúscula</li>
        <li>Al menos un número</li>
        <li>Mínimo 8 caracteres</li>
      </ul>
    </>
  );

  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toast} position="top-right" />
      <div className="card col-12 sm:col-10 md:col-8 lg:col-6 xl:col-4">
        <h5 className="text-center mb-5">Registrarse</h5>
        {isLoading ? (
          <div className="spinner__container">
            <ProgressSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitRegister)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="nameRegister"
                  control={control}
                  rules={{ required: "El nombre es requerido" }}
                  render={({ field }) => (
                    <InputText id={field.name} {...field} autoFocus />
                  )}
                />
                <label
                  htmlFor="nameRegister"
                  className={classNames({ "p-error": errors.nameRegister })}
                >
                  Nombre
                </label>
              </span>
              {getFormErrorMessage("nameRegister")}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="emailRegister"
                  control={control}
                  rules={{
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message:
                        "Correo electrónico inválido. Ejemplo: example@email.com",
                    },
                  }}
                  render={({ field }) => (
                    <InputText id={field.name} {...field} />
                  )}
                />
                <label
                  htmlFor="emailRegister"
                  className={classNames({
                    "p-error": !!errors.emailRegister,
                  })}
                >
                  Correo electrónico
                </label>
              </span>
              {getFormErrorMessage("emailRegister")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="passwordRegister"
                  control={control}
                  rules={{
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener mínimo 8 caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      weakLabel="Débil"
                      mediumLabel="Intermedia"
                      strongLabel="Fuerte"
                      promptLabel="Contraseña"
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="passwordRegister"
                  className={classNames({
                    "p-error": errors.passwordRegister,
                  })}
                >
                  Contraseña
                </label>
              </span>
              {getFormErrorMessage("passwordRegister")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="dateRegister"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="dd/mm/yy"
                      mask="99/99/9999"
                      showIcon
                    />
                  )}
                />
                <label htmlFor="dateRegister">Fecha de nacimiento</label>
              </span>
            </div>
            <div className="field-checkbox">
              <Controller
                name="acceptRegister"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                  />
                )}
              />
              <label
                htmlFor="acceptRegister"
                className={classNames({ "p-error": errors.acceptRegister })}
              >
                Estoy de acuerdo con los términos y condiciones
              </label>
            </div>
            <div className="buttons__container flex-column sm:flex-row">
              <Button
                type="submit"
                label="Registrarse"
                className="sm:mb-0 sm:mr-4 ingresar__button "
              />
              <Button className="google p-0" aria-label="Google">
                <i className="pi pi-google px-2"></i>
                <span className="px-3">Registrarse con Google</span>
              </Button>
            </div>
            <div
              className="mt-4"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Si ya tenés una cuenta,
              <Button
                onClick={() => {
                  setHasUser(true);
                }}
                label="iniciá sesión"
                style={{ width: "75px" }}
                className="p-button-sm p-button-text p-0 ml-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
