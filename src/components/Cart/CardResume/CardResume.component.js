import React, { useContext, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import NoImagen from "../../../assets/NoImagen.png";
import CartContext from "../../../context/cart/CartContext";

import "./cardResume.styles.css";

const Card = ({ data, hasChangeQuantity = true }) => {
  const [valueSelected, setValueSelected] = useState(data?.quantity);
  const cartContext = useContext(CartContext);

  const { changeQuantityItems } = cartContext;

  return (
    <div className="items__container">
      <div className="card">
        <div className="col-12">
          <div className="product-list-item ">
            <img
              src={data?.img}
              onError={(e) => (e.target.src = NoImagen)}
              alt={data?.name}
            />
            <div className="product-list-detail">
              <div className="product-name">{data?.name}</div>
              <div className="product-description">{data?.description}</div>
              <span className="product-category">{`Categoria: ${data?.section}`}</span>
            </div>
            <div style={{ flexDirection: "column", display: "flex" }}>
              <div className="price__container">
                <span className="price__value">€{data?.totalPrice}</span>
              </div>
              {hasChangeQuantity ? (
                <InputNumber
                  value={valueSelected}
                  onValueChange={(e) => {
                    setValueSelected(e.value);
                    changeQuantityItems({
                      id: data?.id,
                      quantity: e?.value,
                      price: data?.price,
                    });
                  }}
                  mode="decimal"
                  className="w-2 quantity__input"
                  showButtons
                  min={0}
                  max={100}
                />
              ) : (
                <div className="product-list-action">
                  <span className="product-price">Cant: {valueSelected}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
