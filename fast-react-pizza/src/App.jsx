import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Menu, Cart, Order, CreateOrder } from "./features";
import Home from "./ui/Home";

// Update element to component and navigate properly using the data syntax
const rotuer = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/menu", element: <Menu /> },
  { path: "/cart", element: <Cart /> },
  {
    path: "/order",
    children: [
      { index: true, element: <Navigate to="/new" /> },
      { path: "new", element: <CreateOrder /> },
      { path: ":orderId", element: <Order /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={rotuer} />;
}
