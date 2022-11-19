import React, { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import NoImagen from "../../../assets/NoImagen.png";

import "./cardResume.styles.css";

const Card = ({ data, changeQuantity, hasChangeQuantity = true }) => {
  const [valueSelected, setValueSelected] = useState(data?.quantity);

  const generateOptions = useCallback(() => {
    const options = [];
    let i = 0;
    while (i <= data?.quantity) {
      options.push(i);
      i++;
    }
    return options;
  }, [data?.quantity]);

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
                <span className="price__value">€{data?.price}</span>
              </div>
              {hasChangeQuantity ? (
                <Dropdown
                  value={valueSelected}
                  options={generateOptions()}
                  onChange={(e) => {
                    setValueSelected(e.value);
                    changeQuantity(data?.id, e.value);
                  }}
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
