import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import Rating from "./Components/Rating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Rating /> */}
    {/* <Rating
      color="red"
      size={24}
      defaultRating={1}
      messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
    /> */}
    <App />
  </StrictMode>
);
