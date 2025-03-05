import "./index.css";
import data from "./assets/init-data";
import { useState } from "react";

function App() {
  const [friends, setFriends] = useState(data);
  const [activeId, setActiveId] = useState(0);

  const addFriends = (friend) => {
    setFriends((friends) => [...friends, friend]);
  };

  const getFriendName = (id) => {
    return friends.find((friend) => friend.id === id).name;
  };

  const updateBalance = (id, amt) => {
    console.log("called");
    setFriends((friends) => {
      console.log("update called");
      return friends.map((friend) => {
        friend.id === id
          ? { ...friend, balance: friend.balance + amt }
          : friend;
      });
    });
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} setActiveId={setActiveId} />
        <FormAddFriend addFriends={addFriends} />
      </div>
      {Boolean(activeId) && (
        <FormSplitBill
          updateBalance={updateBalance}
          friendId={activeId}
          friendName="Clark"
        />
      )}
    </div>
  );
}

function Button({ classes, onClick, children }) {
  return (
    <button className={`button ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, setActiveId }) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendCard key={friend.id} {...friend} {...{ setActiveId }} />
      ))}
    </ul>
  );
}

function FriendCard({ id, name, image, balance, setActiveId }) {
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
      <Button onClick={() => setActiveId(id)}>Select</Button>
    </li>
  );
}

function FormAddFriend({ addFriends }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSumit = (e) => {
    e.preventDefault();
    addFriends({ id: Date.now(), name, image, balance: 0 });
    setName("");
    setImage("");
  };

  return (
    <>
      <form
        className={`form-add-friend ${isOpen ? "" : "hidden"}`}
        style={isOpen ? {} : { display: "none" }}
        onSubmit={handleSumit}
      >
        <label>👬 Friends Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update later with useRef to avoid re-renders
        />

        <label>🌆 Image Url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update later with useRef to avoid re-renders
        />

        <Button>Add</Button>
      </form>

      <Button onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {isOpen ? "Cancel" : "Add Friend"}
      </Button>
    </>
  );
}

function FormSplitBill({ updateBalance, friendId, friendName }) {
  const [bill, setBill] = useState(0);
  const [userExpense, setUserExpense] = useState(0);
  const [isLoaned, setIsLoaned] = useState(false);
  const freindExpense = bill - userExpense;

  const handleSumit = (e) => {
    e.preventDefault();
    if (!isLoaned) console.log(-userExpense);
    updateBalance(friendId, isLoaned ? freindExpense : -userExpense);
    // setBill(0);
    // setUserExpense(0);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSumit}>
      <h2>Split a bill with your friends</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill || ""}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>🧍‍♂️ Your Expense</label>
      <input
        type="text"
        value={userExpense || ""}
        onChange={(e) => setUserExpense(e.target.value)}
      />

      <label>👬 {friendName}'s' Expense</label>
      <input
        type="text"
        value={
          freindExpense === 0
            ? ""
            : freindExpense > 0
            ? freindExpense
            : "Enter Bill First"
        }
        disabled
      />

      <label>🤑 Who is paying the bill</label>
      <select onChange={(e) => setIsLoaned(e.target.value === "loaned")}>
        <option value="loaned">You</option>
        <option value="notLoaned">{friendName}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
