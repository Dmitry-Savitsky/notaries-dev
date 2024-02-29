import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddAccountingForm = ({ show, handleClose, handleAdd }) => {
  const [formData, setFormData] = useState({
    AccountingDate: "",
    idClient: "",
    idEmployee: "",
    idService: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Call the handleAdd function with the formData
    handleAdd(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Accounting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAccountingDate">
            <Form.Label>Accounting Date</Form.Label>
            <Form.Control
              type="date"
              name="AccountingDate"
              value={formData.AccountingDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formClientId">
            <Form.Label>Client ID</Form.Label>
            <Form.Control
              type="number"
              name="idClient"
              value={formData.idClient}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmployeeId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="number"
              name="idEmployee"
              value={formData.idEmployee}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formServiceId">
            <Form.Label>Service ID</Form.Label>
            <Form.Control
              type="number"
              name="idService"
              value={formData.idService}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAccountingForm;
