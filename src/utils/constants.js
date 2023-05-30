export const STEP_RESUMEN = 0;
export const STEP_LOCATION = 1;
export const STEP_PAYMENT = 2;
export const STEP_CONFIRM = 3;

export const A_DOMICILIO = "A domicilio";
export const RECOGIDA = "Recogida";

export const LOCATION_DIALOG = 0;
export const DELIVERY_INFO_DIALOG = 1;

export const NEW_DIALOG = 0;
export const EDIT_DIALOG = 1;

export const DEFAULT_VALUES_LOCATION = {
  address: "",
  additionalInfo: "",
  zip: "",
  clarifications: "",
  label: "",
  typeDelivery: "",
  clarificationsDelivery: "",
};

export const OPTIONS_DELIVERY_INFO = [
  "Encontrarse con el repartidor en la puerta",
  "Dejar en la puerta",
];

export const DELIVERY_TYPE = ["A domicilio", "Recogida"];

export const DISCOUNT_CODE = [
  { name: "off5", value: 5 },
  { name: "off10", value: 10 },
  { name: "off15", value: 15 },
  { name: "off20", value: 20 },
  { name: "off25", value: 25 },
  { name: "off30", value: 30 },
];
