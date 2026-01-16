import { Provider } from "react-redux";
import {
  AccountOperations,
  BalanceDisplay,
  CreateCustomer,
  Customer,
} from "./features";

import store from "./store/store";
import "./index.css";
function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>🏦 The React-Redux Bank ⚛️</h1>
        <CreateCustomer />
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </div>
    </Provider>
  );
}

export default App;
