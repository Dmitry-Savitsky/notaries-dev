import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateService, deleteService } from "../http/servicesApi.js";

const ServiceMenu = ({ service, show, handleClose, handleServiceUpdate }) => {
  const [updatedService, setUpdatedService] = React.useState({ ...service });

  const handleUpdate = async () => {
    try {
      await updateService(service.idService, updatedService);
      console.log("Service updated successfully");
      handleServiceUpdate(); // Trigger the function to update services
      handleClose();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(service.idService);
      console.log("Service deleted successfully");
      handleServiceUpdate(); // Trigger the function to update services
      handleClose();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService((prevService) => ({
      ...prevService,
      [name]: value
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Service Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="serviceName">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                name="ServiceName"
                value={updatedService.ServiceName}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="serviceDescription">
              <Form.Label>Service Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter service description"
                name="ServiceDescription"
                value={updatedService.ServiceDescription}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="servicePrice">
              <Form.Label>Service Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter service price"
                name="ServicePrice"
                value={updatedService.ServicePrice}
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

export default ServiceMenu;
