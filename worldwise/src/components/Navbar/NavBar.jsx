import { NavLink } from "react-router";
import styles from "./NavBar.module.css"


export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/price">Pricing</NavLink></li>
        <li><NavLink to="/product">Product</NavLink></li>
      </ul>
    </nav>
  )
}