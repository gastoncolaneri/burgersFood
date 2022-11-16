import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./app.min.css";

import Navigation from "./navigation/Navigation";
import CartState from "./context/cart/CartState";

function App() {
  return (
    <CartState>
      <Navigation />
    </CartState>
  );
}

export default App;
