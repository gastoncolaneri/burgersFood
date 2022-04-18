import React from "react";
import "./cart.styles.css";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Card from "./Card/Card.component";
import { foodItems } from "../../data/data";

const Cart = ({ isVisibleCart, setIsVisibleCard }) => {
  return (
    <Sidebar
      visible={isVisibleCart}
      position="right"
      onHide={() => setIsVisibleCard(false)}
      className="cart__overlay"
      showCloseIcon={false}
    >
      <div className="cart__container">
        <h3>Resumen de tu pedido</h3>
        <Card data={foodItems} />
      </div>

      <div className="button__container">
        <Button label="Continuar con el pago: $500" />
      </div>
    </Sidebar>
  );
};

export default Cart;
