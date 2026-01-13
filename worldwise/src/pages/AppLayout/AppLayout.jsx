import { Sidebar, Map, User } from "../../components";
import styles from "./AppLayout.module.css";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}
