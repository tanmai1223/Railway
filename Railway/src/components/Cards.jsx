import style from "../styles/card.module.css";
import { ExternalLink, BookOpen } from "lucide-react";

function Cards({ data, index }) {
  return (
    <div
      className={style.ruleCard}
      style={{
        "--theme": data.color,
      }}
    >
      <div className={style.topCircle}>
        <span>{String(index).padStart(2, "0")}</span>
      </div>

      <div className={style.cardIcon}>
        <BookOpen size={34} strokeWidth={2.3} />
      </div>

      <h1>{data.title}</h1>

      <h3>{data.group}</h3>

      <ul>
        {data.summary.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <hr />

      <div className={style.cardFooter}>
        <a
          href={data.googleDriveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF in new tab
        </a>

        <a
          href={data.googleDriveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button">
            <ExternalLink size={18} />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Cards;