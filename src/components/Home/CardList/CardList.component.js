import React, { useContext, useRef, useState } from "react";
import { DataView } from "primereact/dataview";
import { Toast } from "primereact/toast";
import { Chip } from "primereact/chip";
import CardItem from "../CardItem/CardItem.component";
import ChipItem from "../../Chip/ChipItem.component";
import CartContext from "../../../context/cart/CartContext";
import { foodItems, optionsMenu } from "../../../data/data";

import "./cardList.styles.css";

const titleList = ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"];

const CardList = () => {
  const toast = useRef(null);
  const cartContext = useContext(CartContext);
  const { addItems } = cartContext;
  const [isFilter, setIsFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(titleList);

  console.log("cartItems");

  const handleClick = (item) => {
    addItems(item);
    toast.current.show({
      severity: "success",
      summary: "Producto agregado",
      detail: "El producto se agregó al carrito",
      life: 4000,
    });
  };

  const filterBySection = (section) => {
    return foodItems.filter((item) => item.section === section);
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />

      <div className="items__container">
        <div className="options">Menu</div>
        <div className="chip__container flex-column sm:flex-row">
          {isFilter && (
            <div
              role="button"
              onClick={() => {
                setIsFilter(false);
                setFilterSelected(titleList);
              }}
            >
              <Chip
                label="Mostrar todos"
                className="mr-2 mb-2 show-all"
                icon="pi pi-database
"
              />
            </div>
          )}
          {optionsMenu.map((data, index) => {
            return (
              <ChipItem
                data={data}
                isFilter={isFilter}
                setIsFilter={setIsFilter}
                filterSelected={filterSelected}
                setFilterSelected={setFilterSelected}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="dataview-demo items__container">
        <div className="card">
          {filterSelected.map((item, index) => {
            return (
              <div className="options__container" key={index}>
                <div className="options">{item}</div>
                <DataView
                  value={filterBySection(item)}
                  layout="list"
                  itemTemplate={(e) => CardItem(e, handleClick)}
                  lazy
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardList;
