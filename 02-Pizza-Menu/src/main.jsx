import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// React v18
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/* Before React 18
   import ReactDOM from 'react-dom';
   ReactDOMReact.render(<App />, document.getElementById('root'));
*/
