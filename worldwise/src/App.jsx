import { BrowserRouter, Routes, Route } from "react-router";
import {
  Homepage,
  Pricing,
  Product,
  PageNotFound,
  AppLayout,
  Login,
} from "./pages";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="price" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
