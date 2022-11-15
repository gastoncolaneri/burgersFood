import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";
import { classNames } from "primereact/utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../utils/Firebase";
import { Toast } from "primereact/toast";

const LoginForm = ({ setHasUser }) => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const toast = useRef(null);
  const defaultValues = {
    emailLogin: "",
    passwordLogin: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitLogin = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data?.emailLogin, data?.passwordLogin)
      .then((userCredential) => {
        navigate("/");
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

  return (
    <div className="flex justify-content-center p-4">
      <Toast ref={toast} position="top-right" />
      <div className="card col-12 sm:col-10 md:col-8 lg:col-6 xl:col-4">
        <h5 className="text-center mb-5">Iniciar sesión</h5>
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
            <div className="buttons__container flex-column sm:flex-row">
              <Button
                type="submit"
                label="Ingresar"
                className="sm:mb-0 sm:mr-4 ingresar__button "
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
  );
};

export default LoginForm;
