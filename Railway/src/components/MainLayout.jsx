import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import style from "../styles/main.module.css";
import { FiSearch } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;


function MainLayout({ title, onBack, search, setSearch, isMobile }) {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [search, setSearch] = useState("");

  const fetchAllCards = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/get`);

      setAllCards(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/group/${encodeURIComponent(title)}`,
      );

      setCards(res.data.data);
      //console.log(res.data.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) {
      fetchCards();
    }
  }, [title]);
  const filteredCards = allCards.filter((card) => {
    const text = search.toLowerCase();

    return (
      card.title.toLowerCase().includes(text) ||
      card.group.toLowerCase().includes(text) ||
      card.summary.some((point) => point.toLowerCase().includes(text))
    );
  });
  const isSearching = !title;
  return (
    <div className={style.mainLayout}>
      {isMobile && (
        <div className={style.searchContainer}>
          {onBack && (
              <button className={style.backBtn} onClick={onBack}>
                ← Back
              </button>
            )}
          <div className={style.searchBox}>
    <FiSearch className={style.searchIcon} />
    <input
      type="text"
      placeholder="Search documents..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={style.searchInput}
    />
  </div>
        </div>
      )}
      {isSearching ? (
        <>
        <div className={style.searchContainer}>
          
         <div className={style.searchBox}>
    <FiSearch className={style.searchIcon} />
    <input
      type="text"
      placeholder="Search documents..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={style.searchInput}
    />
  </div>
        </div>
          {search.trim() === "" ? (
            <div className={style.emptyState}>
              <h2>Search Railway Documents</h2>

              <p>
                Start typing to search documents by title, group or summary.
              </p>
            </div>
          ) : (
            <div className={style.cardsGrid}>
              {filteredCards.map((card, index) => (
                <Cards key={card._id} data={card} index={index + 1} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className={style.titleBar}>
            

            <h2 className={style.pageTitle}>
              {search.trim() ? "Search Results" : title}
            </h2>
          </div>

          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <div className={style.cardsGrid}>
              {(search.trim() ? filteredCards : cards).map((card, index) => (
                <Cards key={card._id} data={card} index={index + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MainLayout;
