import { useMemo } from "react";
import { MdMenuBook } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import styles from "../styles/sidebar.module.css";

function Sidebar({
  cards,
  selectedGroup,
  setSelectedGroup,
  search,
  setSearch,
  showSearch,
}) {

  const groups = useMemo(() => {
  return [...new Set(cards.map(card => card.group))].sort();
}, [cards]);
  
  return (
    <div className={styles.sidebar}>
      {showSearch && selectedGroup && (
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      )}

      <ul className={styles.sidebarMenu}>
        {groups.map((group) => (
          <li key={group} className={styles.menuItem}>
            <button
              onClick={() => setSelectedGroup(group)}
              className={
                selectedGroup === group ? styles.active : ""
              }
            >
              <MdMenuBook className={styles.icon} />
              {group}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;