/* eslint-disable react/prop-types */
import "./index.css";
import pizzaData from "./assets/data";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu pizzas={pizzaData} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu({ pizzas }) {
  const pizzaList = pizzas.map((pizza, index) => (
    <Pizza key={index} {...pizza} />
  ));
  return (
    <menu className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">{pizzaList}</ul>
    </menu>
  );
}

function Pizza({ name, ingredients, img, price }) {
  return (
    <li className="pizza">
      <img src={img} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>${price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if (hour > openHour && hour < closeHour) alert("we are open");

  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We are currently open. Copyright &copy;
      2023 Fast React Pizza Co.
    </footer>
  );
}

export default App;
