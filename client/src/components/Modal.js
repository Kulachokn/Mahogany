import { useState } from "react";

import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

const ModalWindow = ({ onHide, show, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  //   const handleClose = (formData) => {
  //     onFormSubmit(formData);
  //     onHide(false);
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((formData) => ({
  //       ...formData,
  //       [name]: value,
  //     }));
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    // console.log(formData);
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
          //   onChange={handleChange}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Description</label>
        <input
          name="description"
          as="textarea"
          rows={3}
          //   onChange={handleChange}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};

export default ModalWindow;
