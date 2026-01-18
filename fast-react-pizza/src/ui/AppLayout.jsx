import { Outlet } from "react-router";
import { CartOverview } from "../features"
import Header from "./Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </>
  )
}