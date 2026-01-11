import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";
export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>
        {lat} {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 20, lng: -30 })}>
        Click
      </button>
    </div>
  );
}
