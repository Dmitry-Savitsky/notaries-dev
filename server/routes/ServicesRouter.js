const { Router } = require('express');
const router = Router();

const ServicesController = require("../controllers/ServicesController");

// Create a new service
router.post('/', ServicesController.create);

// Get all services
router.get('/', ServicesController.getAll);

// Get a specific service by ID
router.get('/:id', ServicesController.getById);

// Update a specific service by ID
router.put('/:id', ServicesController.update);

// Delete a specific service by ID
router.delete('/:id', ServicesController.delete);

module.exports = router;
