import "../SCA/Steps/_step.css";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
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
          <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
            <span>👈</span> Previous
          </Button>
          <Button
            textColor="#fff"
            bgColor="#7950f2"
            label="Next"
            onClick={handleNext}
          >
            Next <span>👉</span>
          </Button>
        </div>
      </div>
    </>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
