import "../assets/accordian.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function Accordian() {
  const [openId, setOpenId] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((faq, ind) => (
        <AccordianItem
          key={ind}
          num={ind + 1}
          isOpen={openId === ind + 1}
          setOpenId={setOpenId}
          {...faq}
        />
      ))}
    </div>
  );
}

function AccordianItem({ num, title, text, isOpen, setOpenId }) {
  return (
    <div
      data-id={num}
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setOpenId(isOpen ? null : num)}
    >
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <p className="content-box">{text}</p>}
    </div>
  );
}
