import React, { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import NoImagen from "../../../assets/NoImagen.png";
import "./card.styles.css";

const Card = ({ data, changeQuantity }) => {
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
            <div className="product-list-action">
              <span className="product-price">${data?.price}</span>
            </div>
            <div className="product-list-action">
              <Dropdown
                value={valueSelected}
                options={generateOptions()}
                onChange={(e) => {
                  setValueSelected(e.value);
                  changeQuantity(data?.id, e.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
