import { Link } from "react-router";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ id, cityName, date, emoji, position }) {
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat.toFixed(4)}&lng=${position.lng.toFixed(4)}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
