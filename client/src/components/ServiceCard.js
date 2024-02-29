import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ServiceMenu from "../components/ServiceMenu"

const ServiceCard = ({ service, isAdmin, handleServiceUpdate }) => {
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
        <Card.Title>{service.ServiceName}</Card.Title>
        <Card.Text>{service.ServiceDescription}</Card.Text>
        <Card.Text>Price: ${service.ServicePrice}</Card.Text>
        {isAdmin && (
          <Button variant="primary" onClick={openMenu}>Details</Button>
        )}
        {/* Pass handleServiceUpdate function as a prop to ServiceMenu */}
        <ServiceMenu
          service={service}
          show={isMenuOpen}
          handleClose={closeMenu}
          handleServiceUpdate={handleServiceUpdate}
        />
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
