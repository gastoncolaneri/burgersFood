import { useContext } from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Card from "../../../Cart/CardResume/CardResume.component";
import CartContext from "../../../../context/cart/CartContext";
import { useState } from "react";
import { DISCOUNT_CODE } from "../../../../utils/constants";

const Resume = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, totalAmount, changeTotalAmount } = cartContext;
  const [codeUsed, setCodeUsted] = useState("");
  const [discountAmountApplied, setDiscountAmountApplied] = useState(0);

  const itemTemplate = (data) => {
    return <Card data={data} key={data?.id} hasChangeQuantity={false} />;
  };

  const checkDiscountCode = (code) => {
    const codeApplied = DISCOUNT_CODE.filter(
      (codes) => codes.name === code.toLowerCase()
    );
    if (codeApplied.length) {
      setDiscountAmountApplied(codeApplied[0].value);
      changeTotalAmount(
        codeApplied[0]?.value > totalAmount
          ? 0
          : totalAmount - codeApplied[0].value
      );
    }
  };

  return (
    <>
      <h3 className="text-center">Resumen de tu pedido</h3>
      <DataScroller
        value={cartItems}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
      ></DataScroller>
      <div className="amount__container">
        <span className="amount__text">Importe a abonar:</span>
        <span className="amount__text">€{totalAmount}</span>
      </div>
      {discountAmountApplied ? (
        <div className="amount__container">
          <span className="amount__text">Descuento aplicado</span>
          <span className="amount__text">€{discountAmountApplied}</span>
        </div>
      ) : null}
      {discountAmountApplied ? null : (
        <div className="discount-code__container">
          <Button
            label="Tengo un cupón de descuento"
            className="discount-code__text"
            icon="pi pi-gift"
            link
          />
          <div className="discount-code__input">
            <InputText
              id="discountCode"
              aria-describedby="discount-code"
              value={codeUsed}
              onChange={(e) => setCodeUsted(e.target.value)}
            />
            <Button
              label="Aplicar"
              severity="success"
              text
              onClick={() => checkDiscountCode(codeUsed)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Resume;
