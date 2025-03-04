import "./index.css";
import data from "./assets/init-data";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  return (
    <ul>
      {data.map((friend) => (
        <FriendCard key={friend.id} {...friend} />
      ))}
    </ul>
  );
}

function FriendCard({ name, image, balance }) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} -${balance}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you${balance}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <button className="button">Select</button>
    </li>
  );
}

export default App;
