import React, { useContext, useRef, useState } from "react";
import { DataView } from "primereact/dataview";
import { Chip } from "primereact/chip";
import CardItem from "../Card/CardItem.component";
import ChipItem from "../Chip/ChipItem.component";
import { optionsMenu, foodItems } from "../../data/data";
import CartContext from "../../context/cart/CartContext";

import "./cardList.styles.css";
import { Toast } from "primereact/toast";

const titleList = ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"];

const CardList = () => {
  const toast = useRef(null);
  const cartContext = useContext(CartContext);
  const { addItems } = cartContext;
  const [isFilter, setIsFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(titleList);

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
