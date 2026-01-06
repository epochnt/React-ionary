import { Link } from "react-router";
import { NavBar, AppNav } from "../components";
export default function Homepage() {
  return (
    <>
      <NavBar />
      <AppNav />
      <h1>WorldWise</h1>

      <Link to="/app"> Go To app </Link>
    </>
  );
}
