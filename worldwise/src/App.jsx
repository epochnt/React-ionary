import { Navigate, BrowserRouter, Routes, Route } from "react-router";
import {
  Homepage,
  Pricing,
  Product,
  PageNotFound,
  ProtectedRoute,
  AppLayout,
  Login,
} from "./pages";
import { Form, City, CityList, CountryList } from "./components";
import { CitiesProvider, AuthProvider } from "./contexts";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="price" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
