import { useContext, useRef, useState } from "react";
import { DataScroller } from "primereact/datascroller";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import Card from "../../../Cart/CardResume/CardResume.component";
import CartContext from "../../../../context/cart/CartContext";
import { DISCOUNT_CODE } from "../../../../utils/constants";

const Resume = () => {
  const cartContext = useContext(CartContext);
  const { cartItems, totalAmount, changeTotalAmount, addSpecialNotes } =
    cartContext;
  const [codeUsed, setCodeUsed] = useState("");
  const [notes, setNotes] = useState("");
  const [discountAmountApplied, setDiscountAmountApplied] = useState(0);
  const toast = useRef(null);

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
      toast.current.show({
        severity: "success",
        summary: "Cupón aplicado",
        detail: "El cupón utilizado se aplicó correctamente",
        life: 5000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Cupón inválido",
        detail: "El cupón utilizado no es correcto. Por favor, verificar",
        life: 5000,
      });
    }
  };

  const handleNotes = (notes) => {
    setNotes(notes);
    addSpecialNotes(notes);
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
        {discountAmountApplied ? null : (
          <div className="discount-code__container">
            <div className="discount-code__input">
              <span className="p-float-label">
                <InputText
                  id="discountCode"
                  aria-describedby="discount-code"
                  value={codeUsed}
                  onChange={(e) => setCodeUsed(e.target.value)}
                />
                <label htmlFor="discountCode">Cupón de descuento</label>
                <Button
                  icon="pi pi-check"
                  severity="success"
                  text
                  onClick={() => checkDiscountCode(codeUsed)}
                />
              </span>
            </div>
          </div>
        )}
        <span className="amount__text">Subtotal: €{totalAmount}</span>
      </div>
      {discountAmountApplied ? (
        <div className="amount__container">
          <span className="amount__text">Descuento aplicado</span>
          <span className="amount__text">€{discountAmountApplied}</span>
        </div>
      ) : null}

      <div className="discount-code__container">
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <InputTextarea
              id="specialNotes"
              aria-describedby="discount-code"
              value={notes}
              onChange={(e) => handleNotes(e.target.value)}
              rows={5}
              cols={35}
            />
            <label htmlFor="specialNotes">Instrucciones adicionales</label>
          </span>
        </div>
      </div>

      {<Toast ref={toast} />}
    </>
  );
};

export default Resume;
