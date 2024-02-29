import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EmployeeMenu from "../components/EmployeeMenu";

const EmployeeCard = ({ employee, isAdmin, handleEmployeeUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to open the menu
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{employee.EmployeeName}</Card.Title>
        <Card.Text>Phone: {employee.EmployeePhone}</Card.Text>
        <Card.Text>Address: {employee.EmployeeAddress}</Card.Text>
        <Card.Text>Status: {employee.EmployeeStatus}</Card.Text>
        <Card.Text>Experience: {employee.EmployeeExperience}</Card.Text>
        {isAdmin && (
          <Button variant="primary" onClick={openMenu}>Details</Button>
        )}
        {/* Pass handleEmployeeUpdate function as a prop to EmployeeMenu */}
        <EmployeeMenu
          employee={employee}
          show={isMenuOpen}
          handleClose={closeMenu}
          handleEmployeeUpdate={handleEmployeeUpdate}
        />
      </Card.Body>
    </Card>
  );
};

export default EmployeeCard;
