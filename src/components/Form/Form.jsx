import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

import "./form.css";

const Form = () => {
  const [hasUser, setHasUser] = useState(true);

  return (
    <div className="form__container">
      {hasUser ? (
        <LoginForm setHasUser={setHasUser} />
      ) : (
        <RegisterForm setHasUser={setHasUser} />
      )}
    </div>
  );
};

export default Form;
