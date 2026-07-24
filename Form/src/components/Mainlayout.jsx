import style from "../styles/main.module.css";
import Card from "./Card";

function MainLayout({ cards }) {
  return (
    <div className={style.mainLayout}>
      <div className={style.cardsGrid}>
        {cards.map((card, index) => (
          <Card
            key={card._id}
            data={card}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default MainLayout;