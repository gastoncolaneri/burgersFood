import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./app.min.css";

import Navigation from "./navigation/Navigation";
import CartState from "./context/cart/CartState";
import UserState from "./context/user/UserState";
import LocationState from "./context/location/LocationState";

function App() {
  return (
    <UserState>
      <CartState>
        <LocationState>
          <Navigation />
        </LocationState>
      </CartState>
    </UserState>
  );
}

export default App;
