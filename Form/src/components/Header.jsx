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
              <div className={styles.titleContainer}>
  <h1>SMART - </h1>
  <h2>Study Materials, Assessment & Resource Tool</h2>
</div>
              
            </div>

            <h2>Zonal Railway Training Institute MLY</h2>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;