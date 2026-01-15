import { lazy } from "react";

export const Login = lazy(() => import("./Login/Login"));
export const Product = lazy(() => import("./Product/Product"));
export const Pricing = lazy(() => import("./Pricing/Pricing"));
export const Homepage = lazy(() => import("./Homepage/Homepage"));
export const AppLayout = lazy(() => import("./AppLayout/AppLayout"));
export const PageNotFound = lazy(() => import("./PageNotFound"));
export { default as ProtectedRoute } from "./ProtectedRoute";
