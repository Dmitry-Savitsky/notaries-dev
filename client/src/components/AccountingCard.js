// AccountingCard.js
import React, { useState } from 'react';

import { Card, Button } from 'react-bootstrap';
import AccountingMenu from './AccountingMenu';

const AccountingCard = ({ accounting, isAdmin, handleAccountingUpdate }) => {
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
        <Card.Title>Service no. {accounting.idAccounting}</Card.Title>
        <Card.Text>Date: {accounting.AccountingDate}</Card.Text>
        {/* Render client, employee, and service details */}
        <Card.Text>Client: {accounting.Client.ClientName}</Card.Text>
        <Card.Text>Employee: {accounting.Employee.EmployeeName}</Card.Text>
        <Card.Text>Service: {accounting.Service.ServiceName}</Card.Text>
        {isAdmin && (
          <Button variant="primary" onClick={openMenu}>Details</Button>
        )}
        {
          <AccountingMenu
          accounting={accounting}
          show={isMenuOpen}
          handleClose={closeMenu}
          handleAccountingUpdate={handleAccountingUpdate}
          />
        }
      </Card.Body>
    </Card>
  );
};

export default AccountingCard;
