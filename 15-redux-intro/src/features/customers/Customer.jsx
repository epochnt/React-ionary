import { useSelector } from "react-redux";
function Customer() {
  const customerName = useSelector((store) => store.customer.customerName);

  return <h2>👋 Welcome, {customerName} </h2>;
}

export default Customer;
