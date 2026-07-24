import { useEffect, useState } from "react";
import axios from "axios";
import { MdMenuBook } from "react-icons/md";
import styles from "../styles/sidebar.module.css";
import { FiSearch } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;


function Sidebar({ selected, onSelect, search, setSearch, showSearch }) {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/getgroups`);

      // Your API returns { success, count, data }
      setMenus(res.data.data);
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    }
  };

  return (
    <div className={styles.sidebar}>
      {showSearch && selected &&(
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
        {menus.map((menu) => (
          <li key={menu} className={styles.menuItem}>
            <button
              onClick={() => onSelect(menu)}
              className={selected === menu ? styles.active : ""}
            >
              <MdMenuBook className={styles.icon} />
              {menu}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
