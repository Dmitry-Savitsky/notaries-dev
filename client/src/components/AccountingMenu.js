import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateAccounting, deleteAccounting } from "../http/accountingApi.js";

const AccountingMenu = ({ accounting, show, handleClose, handleAccountingUpdate }) => {
  const [updatedAccounting, setUpdatedAccounting] = useState({ ...accounting });

  const handleUpdate = async () => {
    try {
      await updateAccounting(accounting.idAccounting, updatedAccounting);
      console.log("Accounting updated successfully");
      handleAccountingUpdate(); // Trigger the function to update accountings
      handleClose();
    } catch (error) {
      console.error("Error updating accounting:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccounting(accounting.idAccounting);
      console.log("Accounting deleted successfully");
      handleAccountingUpdate(); // Trigger the function to update accountings
      handleClose();
    } catch (error) {
      console.error("Error deleting accounting:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccounting((prevAccounting) => ({
      ...prevAccounting,
      [name]: value
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Accounting Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="accountingDate">
              <Form.Label>Accounting Date</Form.Label>
              <Form.Control
                type="date"
                name="AccountingDate"
                value={updatedAccounting.AccountingDate}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="clientId">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                type="text"
                name="idClient"
                value={updatedAccounting.idClient}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="idEmployee"
                value={updatedAccounting.idEmployee}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="serviceId">
              <Form.Label>Service ID</Form.Label>
              <Form.Control
                type="text"
                name="idService"
                value={updatedAccounting.idService}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountingMenu;
