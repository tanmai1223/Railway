import { useEffect, useState } from "react";
import axios from "axios";
import style from "../src/styles/home.module.css";
import "./app.css";
import Forms from "./components/Forms";
import Header from "./components/Header";
import MainLayout from "./components/Mainlayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get`);
      setCards(res.data.data);
      //console.log(res.data.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <div className={style.appContainer}>
        <Header />

        <div className={style.content}>
          <div className={style.leftPanel}>
            <Forms setCards={setCards} />
          </div>

          <div className={style.rightPanel}>
            <MainLayout cards={cards} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;