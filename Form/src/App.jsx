import { useEffect, useState } from "react";
import axios from "axios";
import style from "../src/styles/home.module.css";
import "./App.css";
import Forms from "./components/Forms";
import Header from "./components/Header";
import MainLayout from "./components/Mainlayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/SideBar";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [cards, setCards] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [refreshCards, setRefreshCards] = useState(false);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get`);
      setCards(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className={style.appContainer}>
        <Header />

        <div className={style.content}>
          <div className={style.leftPanel}>
            <Forms
              setCards={setCards}
              onSuccess={() => setRefreshCards((prev) => !prev)}
              setSelectedGroup={setSelectedGroup}
            />
          </div>

          <div className={style.sidebarPanel}>
            <Sidebar
              cards={cards}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
          </div>

          <div className={style.rightPanel}>
            <MainLayout
              selectedGroup={selectedGroup}
              refreshCards={refreshCards}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
