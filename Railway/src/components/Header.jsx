import styles from "../styles/header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.card}>

        <div className={styles.headerContent}>

          <img
            src="logo.png"
            alt="Railway Logo"
            className={styles.logo}
          />

          <div className={styles.textSection}>
            <div className={styles.topRow}>
              <h1>Zonal Railway Training Institute MLY</h1>
            </div>

            <h2>SMART - Study Material And Railway Training</h2>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;