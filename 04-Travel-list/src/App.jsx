import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const addItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const removeItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) return { ...item, packed: !item.packed };
        return item;
      })
    );
  };

  const dropAllItems = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form {...{ items }} addItem={addItem} />
      <PackingList
        {...{ items }}
        removeItem={removeItem}
        toggleItem={toggleItem}
        dropAllItems={dropAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ items, addItem }) {
  const [qty, setQty] = useState(1);
  const [desc, setDesc] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!desc) return;

    const item = {
      id: items[items.length - 1].id + 1,
      description: desc,
      quantity: qty,
      packed: false,
    };
    addItem(item);
    setQty(1);
    setDesc("");
  };

  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>W hat do you need for your 😍 trip ?</h3>
      <select value={qty} onChange={(e) => setQty(+e.target.value)}>
        {Array.from({ length: 20 }, (val, index) => {
          return (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, removeItem, toggleItem, dropAllItems }) {
  //declaring sortBy state here so that we only re-render packing list component and not the whole app with item mutation
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = items;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure that you want to delete all items"
    );
    if (confirmed) dropAllItems();
  };

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item, index) => {
          return (
            <Item
              {...item}
              key={index}
              removeItem={removeItem}
              toggleItem={toggleItem}
            />
          );
        })}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

function Item({ id, description, quantity, packed, removeItem, toggleItem }) {
  return (
    <li>
      <input type="checkbox" checked={packed} onChange={() => toggleItem(id)} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        📦 {quantity} {description}
      </span>
      <button onClick={() => removeItem(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start Adding Some Items to your packing list 🚀</em>
      </footer>
    );
  const packedCount = items.filter((item) => item.packed).length;
  const packedPercentage = ((packedCount / items.length) * 100).toFixed(2);

  return (
    <footer className="stats">
      <em>
        {packedCount === items.length
          ? "You got everything! Ready to go ✈️"
          : `👜 You Have ${items.length}
            items on your list, and you already packed ${packedCount}
            (${packedPercentage}%)`}
      </em>
    </footer>
  );
}
export default App;
