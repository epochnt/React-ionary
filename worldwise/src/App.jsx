import { BrowserRouter, Routes, Route } from "react-router";
import { Homepage, Pricing, Product, PageNotFound, AppLayout } from "./pages";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="product" element={<Product />} />
        <Route path="price" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
