import { useState } from "react";
import axios from "axios";
import style from "../styles/editModal.module.css";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function EditModal({ data, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: data.title,
    group: data.group,
    summary: data.summary.join(". "),
    googleDriveUrl: data.googleDriveUrl,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${API_URL}/api/update/${data._id}`,
        formData,
      );

      toast.success("Document updated successfully!");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update document");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/delete/${data._id}`);

      toast.success("Document deleted successfully!");

      setShowDeleteModal(false);

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete document");
    }
  };
  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2>Edit Document</h2>

        <div className={style.formGroup}>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div className={style.formGroup}>
          <label>Group</label>
          <input name="group" value={formData.group} onChange={handleChange} />
        </div>

        <div className={style.formGroup}>
          <label>Summary</label>
          <textarea
            rows="8"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div className={style.formGroup}>
          <label>Google Drive Link</label>
          <input
            type="text"
            name="googleDriveUrl"
            value={formData.googleDriveUrl}
            onChange={handleChange}
            placeholder="Paste Google Drive link"
          />
        </div>

        <div className={style.buttons}>
          <button
            className={style.deleteBtn}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>

          <div className={style.rightButtons}>
            <button className={style.cancelBtn} onClick={onClose}>
              Cancel
            </button>

            <button className={style.saveBtn} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className={style.confirmOverlay}>
          <div className={style.confirmModal}>
            <h3>Delete Document?</h3>

            <p>
              Are you sure you want to delete
              <br />
              <strong>{data.title}</strong>?
            </p>

            <div className={style.confirmButtons}>
              <button
                className={style.cancelBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className={style.confirmDeleteBtn} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditModal;
