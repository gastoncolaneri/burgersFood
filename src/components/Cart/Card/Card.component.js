import React from "react";
import NoImagen from "../../../assets/NoImagen.png";
import "./card.styles.css";

const Card = ({ data }) => {
  console.log(data);
  return (
    <div className="items__container">
      <div className="card">
        <div className="col-12">
          <div className="product-list-item ">
            <img
              src={data[0].img}
              onError={(e) => (e.target.src = NoImagen)}
              alt={data[0].name}
            />
            <div className="product-list-detail">
              <div className="product-name">{data[0].name}</div>
              <div className="product-description">{data[0].description}</div>
              <span className="product-category">{`Categoria: ${data[0].section}`}</span>
            </div>
            <div className="product-list-action">
              <span className="product-price">${data[0].price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
