import style from "../styles/card.module.css";
import EditModal from "./EditModal";
import { useState } from "react";

import { ExternalLink } from "lucide-react";

function Cards({ data }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={style.ruleCard}
        style={{
          "--theme": data.color,
        }}
        onDoubleClick={() => setShowModal(true)}
      >
        <div className={style.cardIcon}></div>

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
            Open Document
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

      {showModal && (
        <EditModal
          data={data}
          onClose={() => setShowModal(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </>
  );
}

export default Cards;