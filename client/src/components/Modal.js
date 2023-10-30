import { useState } from "react";

import Modal from "react-bootstrap/Modal";

const ModalWindow = ({ onHide, show, onFormSubmit }) => {
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

  return (
    <Modal show={show}>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="My playlist"
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          name="description"
          as="textarea"
          rows={3}
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};

export default ModalWindow;
