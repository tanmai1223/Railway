import style from "../styles/card.module.css";
import EditModal from "./EditModal";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ data, onSuccess }) {
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: data._id,
  });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          ...dragStyle,
          "--theme": data.color,
        }}
        className={style.ruleCard}
        onDoubleClick={() => setShowModal(true)}
        {...attributes}
        {...listeners}
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
  onSuccess={onSuccess}
/>
      )}
    </>
  );
}

export default Card;