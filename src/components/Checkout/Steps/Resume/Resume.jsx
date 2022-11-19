import { useContext } from "react";
import { DataScroller } from "primereact/datascroller";
import Card from "../../../Cart/CardResume/CardResume.component";
import CartContext from "../../../../context/cart/CartContext";
import { amountToPay } from "../../../../utils";

const Resume = () => {
  const cartContext = useContext(CartContext);
  const { finalItems } = cartContext;
  const itemTemplate = (data) => {
    return <Card data={data} key={data?.id} hasChangeQuantity={false} />;
  };

  return (
    <>
      <h3 className="text-center">Resumen de tu pedido</h3>
      <DataScroller
        value={finalItems}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
      ></DataScroller>
      <div className="amount__container">
        <span className="amount__text">Importe a abonar:</span>
        <span className="amount__text">€{amountToPay(finalItems)}</span>
      </div>
    </>
  );
};

export default Resume;
