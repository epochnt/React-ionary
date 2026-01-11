import { Sidebar, Map } from "../../components"
import styles from './AppLayout.module.css'
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  )
}