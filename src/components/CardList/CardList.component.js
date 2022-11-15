import React, { useState } from "react";
import { DataView } from "primereact/dataview";
import CardItem from "../Card/CardItem.component";
import ChipItem from "../Chip/ChipItem.component";
import { optionsMenu, foodItems } from "../../data/data";
import "./cardList.styles.css";
import { Chip } from "primereact/chip";

const CardList = () => {
  const titleList = ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"];
  const [isFilter, setIsFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(titleList);

  const filterBySection = (section) => {
    return foodItems.filter((item) => item.section === section);
  };

  return (
    <>
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
                  itemTemplate={CardItem}
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
