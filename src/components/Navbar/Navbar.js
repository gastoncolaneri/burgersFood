import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Cart from "../Cart/Cart.component";
import { app } from "../../utils/Firebase";
import Logo from "../../assets/logo.png";

import "./navbar.css";
import { Toast } from "primereact/toast";

const Navbar = () => {
  const toast = useRef(null);
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isVisibleCart, setIsVisibleCard] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserLogin(true) : setUserLogin(false);
      setIsLoading(false);
    });
  }, [auth, userLogin]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Sesión finalizada",
          detail: "Ha cerrado sesión correctamente.",
          life: 5000,
        });
      })
      .catch(() => {});
  };

  const items = [
    {
      label: "Mis pedidos",
      icon: "pi pi-list",
      iconPos: "right",
      command: () => {
        console.log("pedidos");
      },
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      iconPos: "right",
      command: logOut,
    },
  ];

  return (
    !isLoading && (
      <>
        <Toast ref={toast} position="top-right" />
        <div className="navbar">
          <div className="logo__box">
            <NavLink to={"/"}>
              <img src={Logo} alt="logo" className="logo" />
            </NavLink>
          </div>
          {userLogin && (
            <div className="cart">
              <Button
                className="p-button-rounded p-button-text p-button-lg"
                icon="pi pi-shopping-cart"
                onClick={() => {
                  setIsVisibleCard(true);
                }}
              />
            </div>
          )}
          <div className="login">
            {userLogin ? (
              <SplitButton
                icon="pi pi-user"
                model={items}
                iconPos="right"
              ></SplitButton>
            ) : (
              <Button
                label="Ingresar"
                className="p-button-raised p-button-sm"
                icon="pi pi-user"
                iconPos="right"
                onClick={() => navigate("login")}
              />
            )}
          </div>
        </div>
        <Cart
          isVisibleCart={isVisibleCart}
          setIsVisibleCard={setIsVisibleCard}
        />
      </>
    )
  );
};

export default Navbar;
