import { useSelector } from "react-redux";
import {
  AccountOperations,
  BalanceDisplay,
  CreateCustomer,
  Customer,
} from "./features";

function App() {
  const customer = useSelector((state) => state.customer.fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customer ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
