import Complementos from "../assets/Complemento.png";
import Pizzas from "../assets/Pizza.png";
import Hamburguesas from "../assets/Hamburguesa.png";
import Bebidas from "../assets/Bebidas.png";
import Papas from "../assets/Papas.png";
import PapasCheddar from "../assets/PapasCheddar.png";
import Nuggets from "../assets/Nuggets.png";
import Coca from "../assets/Coca.png";
import Sprite from "../assets/Sprite.png";
import Fanta from "../assets/Fanta.png";
import FantaUva from "../assets/FantaUva.png";
import Agua from "../assets/Agua.png";
import Pizza1 from "../assets/Pizza1.jpg";
import Pizza2 from "../assets/Pizza2.jpg";
import Pizza3 from "../assets/Pizza3.jpg";
import Hamburguesa1 from "../assets/Hamburguesa1.png";
import Hamburguesa2 from "../assets/Hamburguesa2.png";
import Hamburguesa3 from "../assets/Hamburguesa3.png";

export const foodItems = [
  {
    id: 1,
    name: "Pizza Muzzarella",
    img: Pizza1,
    section: "Pizzas",
    description: "Pizza casera a la piedra, muzzarella, tomate y morrón asado",
    price: 12,
    quantity: 0,
  },
  {
    id: 2,
    name: "Pizza Calabresa",
    img: Pizza2,
    section: "Pizzas",
    description: "Pizza casera a la piedra, muzzarella doble y longaniza.",
    price: 13,
    quantity: 0,
  },
  {
    id: 3,
    name: "Pizza Especial",
    img: Pizza3,
    section: "Pizzas",
    description:
      "Pizza casera a la piedra, muzzarella, jamón, morrón asado, huevo y champiñones",
    price: 14,
    quantity: 0,
  },
  {
    id: 4,
    name: "Hamburguesa deluxe",
    img: Hamburguesa1,
    section: "Hamburguesas",
    description:
      "Hamburguesa de asado de 180g, mostaza dulce, cebolla caramelizada, queso cheddar, lechuga y bacon",
    price: 12,
    quantity: 0,
  },
  {
    id: 5,
    name: "Hamburguesa Leader",
    img: Hamburguesa2,
    section: "Hamburguesas",
    description:
      "Hamburguesa de asado de 180g, mostaza dulce, cebolla morada, queso dambo, bacon y lechuga",
    price: 11,
    quantity: 0,
  },
  {
    id: 6,
    name: "Hamburguesa Star",
    img: Hamburguesa3,
    section: "Hamburguesas",
    description:
      "Hamburguesa de asado de 180g, mostaza dulce, cebolla morada, rúcula y queso cheddar",
    price: 11,
    quantity: 0,
  },
  {
    id: 7,
    name: "Papas fritas",
    img: Papas,
    section: "Complementos",
    description: "Porción de papas fritas medianas",
    price: 2,
    quantity: 0,
  },
  {
    id: 8,
    name: "Papas fritas deluxe",
    img: PapasCheddar,
    section: "Complementos",
    description: "Porción de papas fritas con bacon y queso cheddar",
    price: 3,
    quantity: 0,
  },
  {
    id: 9,
    name: "Nuggets x10",
    img: Nuggets,
    section: "Complementos",
    description: "10 unidades de nuggets",
    price: 5,
    quantity: 0,
  },
  {
    id: 10,
    name: "Coca cola",
    img: Coca,
    section: "Bebidas",
    description: "Lata de gaseosa sabor Coca cola",
    price: 2,
    quantity: 0,
  },
  {
    id: 11,
    name: "Sprite",
    img: Sprite,
    section: "Bebidas",
    description: "Lata de gaseosa sabor Sprite",
    price: 2,
    quantity: 0,
  },
  {
    id: 12,
    name: "Fanta",
    img: Fanta,
    section: "Bebidas",
    description: "Lata de gaseosa sabor Fanta",
    price: 2,
    quantity: 0,
  },
  {
    id: 13,
    name: "Fanta uva",
    img: FantaUva,
    section: "Bebidas",
    description: "Lata de gaseosa sabor Fanta uva",
    price: 2,
    quantity: 0,
  },
  {
    id: 14,
    name: "Agua mineral",
    img: Agua,
    section: "Bebidas",
    description: "Botella de agua mineral sin gas",
    price: 2,
    quantity: 0,
  },
];

export const optionsMenu = [
  {
    section: "Pizzas",
    imgTag: Pizzas,
  },
  {
    section: "Hamburguesas",
    imgTag: Hamburguesas,
  },
  {
    section: "Complementos",
    imgTag: Complementos,
  },
  {
    section: "Bebidas",
    imgTag: Bebidas,
  },
];
