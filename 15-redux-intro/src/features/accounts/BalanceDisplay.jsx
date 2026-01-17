import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// Old redux before hooks incease you see it in the wild
function mapStateToProps(store) {
  return {
    balance: store.account.balance,
  };
}

//connect returnse a function that then takes the component as arg
// and return the whole component. The passes component then gets
// access to the mapped state variable passed to connect

export default connect(mapStateToProps)(BalanceDisplay);
