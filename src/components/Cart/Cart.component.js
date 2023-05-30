import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Card from "./CardResume/CardResume.component";
import CartContext from "../../context/cart/CartContext";

import "./cart.styles.css";

const Cart = ({ isVisibleCart, setIsVisibleCard }) => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cartItems, changeQuantityItems, totalAmount } = cartContext;

  const onClick = () => {
    setIsVisibleCard(false);
    navigate("checkout");
  };

  return (
    <Sidebar
      visible={isVisibleCart}
      position="right"
      onHide={() => setIsVisibleCard(false)}
      className="cart__overlay"
      showCloseIcon={false}
      blockScroll
    >
      <div className="cart__container">
        <h3>Resumen de tu pedido</h3>
        {cartItems?.map((item) => (
          <Card
            data={item}
            key={item?.id}
            hasChangeQuantity
            changeQuantity={changeQuantityItems}
          />
        ))}
      </div>

      <div className="button__container">
        <Button
          label={
            !cartItems?.length
              ? "No hay productos en el carrito"
              : `Continuar con el pago: €${totalAmount}`
          }
          onClick={onClick}
          disabled={!cartItems?.length}
        />
      </div>
    </Sidebar>
  );
};

export default Cart;
