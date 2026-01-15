import { Suspense } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router";

import { ProtectedRoute } from "./pages";
import {
  Form,
  City,
  CityList,
  CountryList,
  SpinnerFullPage,
} from "./components";
import { CitiesProvider, AuthProvider } from "./contexts";
import "./index.css";

// Lazy loaded dynamic imports
import {
  Homepage,
  Pricing,
  Product,
  PageNotFound,
  AppLayout,
  Login,
} from "./pages";
export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
