import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateEmployee, deleteEmployee } from "../http/employeesApi.js";

const EmployeeMenu = ({ employee, show, handleClose, handleEmployeeUpdate }) => {
  const [updatedEmployee, setUpdatedEmployee] = React.useState({ ...employee });

  const handleUpdate = async () => {
    try {
      await updateEmployee(employee.idEmployee, updatedEmployee);
      console.log("Employee updated successfully");
      handleEmployeeUpdate(); // Trigger the function to update employees
      handleClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.idEmployee);
      console.log("Employee deleted successfully");
      handleEmployeeUpdate(); // Trigger the function to update employees
      handleClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Employee Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="employeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee name"
                name="EmployeeName"
                value={updatedEmployee.EmployeeName}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="employeePhone">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee phone"
                name="EmployeePhone"
                value={updatedEmployee.EmployeePhone}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeAddress">
              <Form.Label>Employee Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee address"
                name="EmployeeAddress"
                value={updatedEmployee.EmployeeAddress}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeStatus">
              <Form.Label>Employee Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter employee status"
                name="EmployeeStatus"
                value={updatedEmployee.EmployeeStatus}
                className="border-secondary"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeExperience">
              <Form.Label>Employee Experience</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter employee experience"
                name="EmployeeExperience"
                value={updatedEmployee.EmployeeExperience}
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

export default EmployeeMenu;
