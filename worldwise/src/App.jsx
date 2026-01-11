import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  Homepage,
  Pricing,
  Product,
  PageNotFound,
  AppLayout,
  Login,
} from "./pages";
import { MOCK_JSON_API } from "./config";
import { CityList } from "./components";
import "./index.css";

export default function App() {
  //Temp code we'll remove later when using context api
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);

        const res = await fetch(MOCK_JSON_API);
        if (!res.ok)
          throw new Error(
            `Mock fetch fail, check if the json-server in runing. HTTP status${res.status}`
          );
        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList {...{ cities, isLoading }} />} />
          <Route
            path="cities"
            element={<CityList {...{ cities, isLoading }} />}
          />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="price" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
