import { Link } from "react-router";
import { SearchOrder } from "../features";

export default function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
    </header>
  );
}
