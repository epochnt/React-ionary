import "./_step.css";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test, setTest] = useState({ name: "Jonas" });

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);

    // setTest({ name: "Nitin" });
    //BAD PRACTICE
    // test.name = "Nitin";
  };

  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {/* {isOpen && (<div className="steps"></div>)} conditional rendering*/}
      <div className={isOpen ? "steps" : "steps hidden"}>
        <div className="numbers">
          <div className={step >= 1 ? "active" : ""}> 1</div>
          <div className={step >= 2 ? "active" : ""}> 2</div>
          <div className={step >= 3 ? "active" : ""}> 3</div>
        </div>

        <p className="message">
          Step {step} : {messages[step - 1]}
        </p>

        <div className="buttons">
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            style={{ backgroundColor: "#7950f2", color: "#fff" }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}