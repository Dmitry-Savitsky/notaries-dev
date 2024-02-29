const { Employees } = require("../models/models"); 
const ApiError = require('../error/ApiError');

class EmployeesController {
    async create(req, res, next) {
        const { EmployeeName, EmployeePhone, EmployeeAddress, EmployeeStatus, EmployeeExperience } = req.body;

        try {
            const newEmployee = await Employees.create({ EmployeeName, EmployeePhone, EmployeeAddress, EmployeeStatus, EmployeeExperience }); 
            return res.status(201).json({ Employee: newEmployee });
        } catch (error) {
            console.error(error)
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAll(req, res, next) {
        try {
            const employees = await Employees.findAll();
            res.status(200).json(employees);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;

        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { EmployeeName, EmployeePhone, EmployeeAddress, EmployeeStatus, EmployeeExperience } = req.body;

        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            employee.EmployeeName = EmployeeName;
            employee.EmployeePhone = EmployeePhone;
            employee.EmployeeAddress = EmployeeAddress;
            employee.EmployeeStatus = EmployeeStatus;
            employee.EmployeeExperience = EmployeeExperience;

            await employee.save();

            res.status(200).json({ Employee: employee });
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            await employee.destroy();
            res.status(204).end();
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new EmployeesController();
