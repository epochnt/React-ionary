import {
  AccountOperations,
  BalanceDisplay,
  CreateCustomer,
  Customer,
} from "./components";
import "./store/store"
import "./index.css";

function App() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
