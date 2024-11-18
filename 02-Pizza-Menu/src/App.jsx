import "./index.css";
// import pizzaData from "./assets/data";
function App() {
  return (
    <div>
      <h1>React</h1>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}

function Pizza() {
  return (
    <div>
      <img src="/src/assets/pizzas/spinaci.jpg" alt="Pizza Spinaci" />
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta cheese</p>
    </div>
  );
}

export default App;
