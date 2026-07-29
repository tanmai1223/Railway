import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/main.module.css";
import Card from "./Card";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function MainLayout({ selectedGroup,refreshCards }) {
  const [cards, setCards] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (!selectedGroup) {
    setCards([]);
    return;
  }

  fetchCards();
}, [selectedGroup, refreshCards]);

  const fetchCards = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/group/${encodeURIComponent(selectedGroup)}`
      );

      setCards(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setCards((items) => {
      const oldIndex = items.findIndex(
        (item) => item._id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item._id === over.id
      );

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const saveOrder = async () => {
    try {
      setSaving(true);

      const items = cards.map((card, index) => ({
        _id: card._id,
        order: index + 1,
      }));

      await axios.put(`${API_URL}/api/updateOrder`, {
        items,
      });

      toast.success("Order updated successfully!");

      fetchCards();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={style.mainLayout}>
      {!selectedGroup ? (
        <div className={style.emptyState}>
          <h3>Select a group from the sidebar</h3>
          <p>Documents in that group will appear here.</p>
        </div>
      ) : (
        <>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
  items={cards.map((card) => card._id)}
  strategy={rectSortingStrategy}
>
              <div className={style.cardsGrid}>
                {cards.map((card) => (
                  <Card
                    key={card._id}
                    data={card}
                    onSuccess={fetchCards}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className={style.saveContainer}>
            <button
              className={style.saveButton}
              onClick={saveOrder}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MainLayout;