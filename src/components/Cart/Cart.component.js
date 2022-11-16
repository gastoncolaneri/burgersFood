import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Card from "./Card/Card.component";
import CartContext from "../../context/cart/CartContext";

import "./cart.styles.css";

const Cart = ({ isVisibleCart, setIsVisibleCard }) => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cartItems, deleteItems } = cartContext;
  const [itemsAdded, setItemsAdded] = useState(cartItems);

  const deleteDuplicate = useCallback(() => {
    const tmpArray = cartItems.reduce((accArr, item) => {
      const tmpArray = accArr.filter((value) => value?.id === item?.id);
      if (tmpArray.length === 0) {
        accArr.push({ ...item, quantity: 1 });
      } else {
        accArr = accArr.map((value) => {
          if (item?.id === value?.id) {
            return { ...value, quantity: value?.quantity + 1 };
          }
          return { ...value, quantity: value?.quantity };
        });
      }
      return accArr;
    }, []);
    setItemsAdded(tmpArray);
  }, [cartItems]);

  const parcialAmounts = itemsAdded.map((item) => {
    return item?.price * item?.quantity;
  });

  const totalAmount = parcialAmounts.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const changeQuantity = (id, quantity) => {
    if (quantity === 0) {
      const modifyQuantity = itemsAdded.map((item) => {
        if (item?.id === id) {
          deleteItems(id);
          return { ...item, quantity: 0 };
        }
        return item;
      });
      const tmpArray = modifyQuantity.filter((item) => {
        return item?.id !== id;
      });
      return setItemsAdded(tmpArray);
    }
    const tmpArray = itemsAdded.map((item) => {
      if (item?.id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setItemsAdded(tmpArray);
  };

  useEffect(() => {
    deleteDuplicate();
  }, [cartItems, deleteDuplicate]);

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
        {itemsAdded?.map((item) => (
          <Card data={item} key={item?.id} changeQuantity={changeQuantity} />
        ))}
      </div>

      <div className="button__container">
        <Button
          label={
            !cartItems?.length
              ? "No hay productos en el carrito"
              : `Continuar con el pago: $${totalAmount}`
          }
          onClick={() => navigate("checkout")}
          disabled={!cartItems?.length}
        />
      </div>
    </Sidebar>
  );
};

export default Cart;
