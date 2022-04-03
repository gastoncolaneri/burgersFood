import React, { useState } from "react";
import { Button } from "primereact/button";
import Logo from "../../assets/logo.png";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { foodItems } from "../../data/data";
import Cart from "../Cart/Cart.component";

const Navbar = () => {
  const navigate = useNavigate();
  const [isVisibleCart, setIsVisibleCard] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="logo__box">
          <NavLink to={"/"}>
            <img src={Logo} alt="logo" className="logo" />
          </NavLink>
        </div>
        <div className="cart">
          <Button
            className="p-button-rounded p-button-text p-button-lg"
            icon="pi pi-shopping-cart"
            onClick={() => {
              setIsVisibleCard(true);
            }}
          />
        </div>
        <div className="login">
          <Button
            label="Ingresar"
            className="p-button-raised p-button-sm"
            icon="pi pi-user"
            iconPos="right"
            onClick={() => navigate("login")}
          />
        </div>
      </div>
      <Cart isVisibleCart={isVisibleCart} setIsVisibleCard={setIsVisibleCard} />
    </>
  );
};

export default Navbar;
