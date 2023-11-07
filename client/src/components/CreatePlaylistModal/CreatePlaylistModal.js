import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./CreatePlaylistModal.module.css";

const CreatePlaylistModal = ({ onHide, show, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    onHide(false);
  };

  const handleClose = () => {
    onHide(false);
  };

  return (
    <Modal show={show}>
      <button className={styles.closeBtn} onClick={handleClose}>
        &#x2715;
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="My playlist"
            onChange={handleChange}
            className={styles.formField}
          />
          <label className={styles.formLabel}>Name the playlist</label>
        </div>
        <div className={styles.formGroup}>
          <input
            name="description"
            as="textarea"
            placeholder="New emotions"
            rows={3}
            onChange={handleChange}
            className={styles.formField}
          />
          <label className={styles.formLabel}>Description</label>
        </div>
        <button type="submit" className={styles.formBtn}>
          Create
        </button>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModal;
