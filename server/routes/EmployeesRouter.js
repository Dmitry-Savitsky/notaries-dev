const { Router } = require('express');
const router = Router();

const EmployeesController = require("../controllers/EmployeesController");

// Create a new service
router.post('/', EmployeesController.create);

// Get all services
router.get('/', EmployeesController.getAll);

// Get a specific service by ID
router.get('/:id', EmployeesController.getById);

// Update a specific service by ID
router.put('/:id', EmployeesController.update);

// Delete a specific service by ID
router.delete('/:id', EmployeesController.delete);

module.exports = router;
