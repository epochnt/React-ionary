import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import {
  Menu,
  menuLoader,
  Cart,
  Order,
  orderLoader,
  CreateOrder,
} from "./features";
import { AppLayout, Home, Error } from "./ui";

// Update element to component and navigate properly using the data syntax
const rotuer = createBrowserRouter([
  {
    // layout route AppLayout
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        loader: menuLoader,
        errorElement: <Error />,
        element: <Menu />,
      },
      { path: "/cart", element: <Cart /> },
      {
        // prefix route order
        path: "/order",
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/new" /> },
          { path: "new", element: <CreateOrder /> },
          { path: ":orderId", loader: orderLoader, element: <Order /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={rotuer} />;
}
