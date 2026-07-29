import { useState } from "react";
import style from "../styles/forms.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function Forms({ setCards,onSuccess,setSelectedGroup })  {
  const [formData, setFormData] = useState({
    title: "",
    group: "",
    summary: "",
    googleDriveUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${API_URL}/api/upload`,
      formData
    );

    // Add the new card immediately
    setCards((prev) => [res.data.data, ...prev]);

    toast.success("Document added successfully!");

    onSuccess();

    setSelectedGroup(formData.group);


    setFormData({
      title: "",
      group: "",
      summary: "",
      googleDriveUrl: "",
    });
  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message || "Failed to add document"
    );
  }
};

  return (
    <div className={style.formContainer}>
      <div className={style.formCard}>
        <h2>Add Document</h2>

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Group</label>
            <input
              type="text"
              name="group"
              placeholder="Enter group"
              value={formData.group}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Summary</label>
            <textarea
              name="summary"
              rows="4"
              placeholder="Enter summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Google Drive Link</label>
            <input
              type="url"
              name="googleDriveUrl"
              placeholder="Paste Google Drive link"
              value={formData.googleDriveUrl}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={style.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forms;