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

/*
  ... Spread operator will take the pizza object -> {name:val, ingredients:val, ...}
  and break the iterable down to name:val, ingredients:val
  so the componenets passed will be name, ingredients, etc and not the pizza object directly

  pizzalist is an array of reactCreate element objects as learned in react behind the scenes🐱‍🏍
  👇
  {
    $$typeof : Symbol(react.element)
    key : "0"
    props : {name: 'Focaccia', ingredients: 'Bread with italian olive oil and rosemary', price: 6, img: '/src/assets/pizzas/focaccia.jpg', soldOut: false, …} 
    ref : null 
    type : ƒ Pizza({ name, ingredients, img, price, soldOut }) 
    _owner : FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …} 
    _store : {validated: false} 
    _self : undefined 
    _source : {fileName: '/home/nitin/React-ionary/02-Pizza-Menu/src/App.jsx', lineNumber: 36, columnNumber: 5}
  }

  pizzaList = [{$$typeof : Symbol(react.element),....},{},{}..]
*/

function Menu({ pizzas }) {
  const pizzaList = pizzas.map((pizza, index) => (
    <Pizza key={index} {...pizza} />
  ));
  return (
    <menu className="menu">
      <h2>Our Menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious
      </p>
      <ul className="pizzas">{pizzaList}</ul>
    </menu>
  );
}

/*
  Destructuring of props.name, props.ingredients, etc 
  to {name , ingredients, ...} = props
*/

function Pizza({ name, ingredients, img, price, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={img} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : `$${price}`}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  /*
    In conditional renders inside JSX
    be sure to use boolean values and not falsy value
    as JSX will take 0 or '' as true -> ❕❔ IT works with falsy values
    ❌

    Conditional rendering another example for a conceptual uscase
      if (isOpen) return (JSX)
      else return (JSX)
    To be done when its not similar html wise
    but conceptually similar so it is in a single compoenet 
  */

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We are open until {closeHour}:00. Come visit us or order online.
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

export default App;
