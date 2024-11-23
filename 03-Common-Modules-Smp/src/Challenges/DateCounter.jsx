import { useState } from "react";

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  let date = new Date();
  date.setDate(date.getDate() + count);

  const handleCountInc = () => {
    //set state is aync so log will have count value as 0, so we move setDate inside the count for now as we don't know useEffect
    //skipping using date as a state
    setCount((c) => {
      c += step;
      // date.setDate(date.getDate() + c);
      // console.log(date.toDateString());
      // doesn't update date, async but still
      return c;
    });
    // count value diff
    // console.log(date.toDateString());
  };

  const handleCountDec = () => {
    setCount((c) => {
      c -= step;
      // date = new date(date.setDate(date.getDate() + c));
      return c;
    });
    // setDate((d) => new Date(d.setDate(d.getDate() + count)));
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "10rem" }}>
      <div className="steps">
        <button onClick={() => setStep((s) => s - 1)}> &minus; </button>
        <span> Step: {step} </span>
        <button onClick={() => setStep((s) => s + 1)}> &#43; </button>
      </div>

      <div className="count">
        <button onClick={handleCountDec}> &minus; </button>
        <span> Count: {count} </span>
        <button onClick={handleCountInc}> &#43; </button>
      </div>

      {/* also can you conditional rendering  */}
      <p className="message">
        {count === 0
          ? "Today is"
          : count > 0
          ? `${count} days from now will be`
          : `${-count} days ago was`}{" "}
        {date.toDateString()}
      </p>
    </div>
  );
}
