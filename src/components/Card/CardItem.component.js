import { Button } from "primereact/button";
import React from "react";
import NoImagen from "../../assets/NoImagen.png";
import "./cardItem.styles.css";

const CardItem = (data) => {
  return (
    <div className="col-12 md:col-4">
      <div className="product-grid-item card">
        <div className="product-grid-item-content">
          <img
            src={data?.img}
            onError={(e) => (e.target.src = NoImagen)}
            alt={data?.name}
            loading="lazy"
          />
          <div className="product-name">{data?.name}</div>
          <div className="product-description">{data?.description}</div>
        </div>
        <div className="product-grid-item-bottom">
          <span className="product-price">${data?.price}</span>
          <Button icon="pi pi-shopping-cart" label="Agregar" />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
