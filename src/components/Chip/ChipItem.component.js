import React from "react";
import { Chip } from "primereact/chip";
import "./chipItem.styles.css";

const ChipItem = ({
  data,
  isFilter,
  setIsFilter,
  filterSelected,
  setFilterSelected,
}) => {
  return (
    <div
      role="button"
      onClick={() => {
        setIsFilter(true);
        setFilterSelected([data.section]);
      }}
    >
      <Chip
        label={data.section}
        image={data.imgTag}
        className={`mr-2 mb-2 chip__item ${
          isFilter && filterSelected[0] === data?.section && "selectedItem"
        }`}
      />
    </div>
  );
};

export default ChipItem;
