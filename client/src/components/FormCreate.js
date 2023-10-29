import { useState } from "react";
import Form from "react-bootstrap/Form";

const FormCreate = ({ onFormSubmit}) => {
  const [formData, setFormData] = useState({
    playlistName: "",
    description: "",
  });

//   const handleChange = (e) => {
    // const { name, value } = e.target;
    // const formData = {
    //   ...formData,
    //   [name]: value,
    // };
    // console.log(formData);
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
//   };

const handleSubmit = () => {
    onFormSubmit(formData); // Передача данных в компонент модального окна
  };

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="playlistName"
          placeholder="My playlist"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          rows={3}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Form.Group>
    </Form>
  );
};

export default FormCreate;
