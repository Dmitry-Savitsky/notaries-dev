const { Router } = require('express');
const router = Router();

const AccountingController = require("../controllers/AccountingController");

// Create a new service
router.post('/', AccountingController.create);

// Get all services
router.get('/', AccountingController.getAll);

// Get a specific service by ID
router.get('/:id', AccountingController.getAllByClientId);

// Update a specific service by ID
router.put('/:id', AccountingController.update);

// Delete a specific service by ID
router.delete('/:id', AccountingController.delete);

module.exports = router;
