import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../utils/Firebase";

import "./form.css";

const Form = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessageLogin, setShowMessageLogin] = useState(false);
  const [showMessageRegister, setShowMessageRegister] = useState(false);
  const [hasUser, setHasUser] = useState(true);
  const defaultValues = hasUser
    ? {
        emailLogin: "",
        passwordLogin: "",
      }
    : {
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
        setShowMessageRegister(true);
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

  const onSubmitLogin = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data?.emailLogin, data?.passwordLogin)
      .then((userCredential) => {
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Sesión iniciada",
          detail: "Ha iniciado sesión correctamente.",
          life: 5000,
        });
        setShowMessageLogin(true);
        setIsLoading(false);
        reset();
      })
      .catch((e) => {
        setIsLoading(false);
        reset();
        toast.current.show({
          severity: "error",
          summary: "Error al iniciar sesión",
          detail: "El correo electrónico y/o la contraseña son inválidos.",
          life: 5000,
        });
      });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() =>
          hasUser ? setShowMessageLogin(false) : setShowMessageRegister(false)
        }
      />
    </div>
  );
  const passwordHeader = <h6>Escoja su contraseña</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una letra minúscula</li>
        <li>Al menos una letra mayúscula</li>
        <li>Al menos un número</li>
        <li>Mínimo 8 caracteres</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Toast ref={toast} position="top-right" />
      <Dialog
        visible={hasUser ? showMessageLogin : showMessageRegister}
        onHide={() =>
          hasUser ? setShowMessageLogin(false) : setShowMessageRegister(false)
        }
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Ingreso exitoso!</h5>
        </div>
      </Dialog>
      {hasUser ? (
        <div className="flex justify-content-center p-4">
          <div className="card">
            <h5 className="text-center">Iniciar sesión</h5>
            {isLoading ? (
              <div className="spinner__container">
                <ProgressSpinner />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmitLogin)} className="p-fluid">
                <div className="field">
                  <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller
                      name="emailLogin"
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
                      htmlFor="emailLogin"
                      className={classNames({ "p-error": !!errors.emailLogin })}
                    >
                      Correo electrónico
                    </label>
                  </span>
                  {getFormErrorMessage("emailLogin")}
                </div>
                <div className="field">
                  <span className="p-float-label">
                    <Controller
                      name="passwordLogin"
                      control={control}
                      rules={{ required: "La contraseña es requerida" }}
                      render={({ field }) => (
                        <Password
                          id={field.name}
                          {...field}
                          toggleMask
                          feedback={false}
                        />
                      )}
                    />
                    <label
                      htmlFor="passwordLogin"
                      className={classNames({
                        "p-error": errors.passwordLogin,
                      })}
                    >
                      Contraseña
                    </label>
                  </span>
                  {getFormErrorMessage("passwordLogin")}
                </div>
                <div className="buttons__container">
                <Button
                    type="submit"
                    label="Ingresar"
                    className="mr-4 ingresar__button "
                  />
                  <Button className="google p-0" aria-label="Google">
                    <i className="pi pi-google px-2"></i>
                    <span className="px-3">Ingresar con Google</span>
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
                  Si no tenés una cuenta,
                  <Button
                    onClick={() => {
                      setHasUser(false);
                    }}
                    label="registrate"
                    style={{ width: "75px" }}
                    className="p-button-sm p-button-text p-0 ml-2"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-content-center p-4">
          <div className="card">
            <h5 className="text-center">Registrarse</h5>
            {isLoading ? (
              <div className="spinner__container">
                <ProgressSpinner />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmitRegister)}
                className="p-fluid"
              >
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
                          message:
                            "La contraseña debe tener mínimo 8 caracteres",
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
                <div className="buttons__container">
                  <Button
                    type="submit"
                    label="Registrarse"
                    className="mr-4 ingresar__button "
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
      )}
    </div>
  );
};

export default Form;
