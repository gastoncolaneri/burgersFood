import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";
import Cart from "../Cart/Cart.component";
import CartContext from "../../context/cart/CartContext";
import { app } from "../../utils/Firebase";
import Logo from "../../assets/logo.png";

import "./navbar.css";

const Navbar = () => {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
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
      label: "Mis direcciones",
      icon: "pi pi-home",
      iconPos: "right",
      command: () => {
        console.log("Mis direcciones");
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
                disabled={!cartItems?.length}
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
