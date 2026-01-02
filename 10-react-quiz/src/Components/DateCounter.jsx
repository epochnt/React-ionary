import { useReducer, useState } from "react";

const initalState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initalState;
    default:
      throw new Error("Unknown action type");
  }
}

export default function DateCounter() {
  const [{ count, step }, dispatchState] = useReducer(reducer, initalState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatchState({ type: "dec" });
  };

  const inc = function () {
    dispatchState({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatchState({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e) {
    dispatchState({ type: "setStep", payload: +e.target.value });
  };

  const reset = function () {
    dispatchState({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
