const { Accountings, Clients, Employees, Services } = require('../models/models');
const ApiError = require('../error/ApiError');

class AccountingsController {
    async create(req, res, next) {
        const { AccountingDate, idClient, idEmployee, idService } = req.body;

        try {
            const newAccounting = await Accountings.create({ AccountingDate, idClient, idEmployee, idService });
            return res.status(201).json({ Accounting: newAccounting });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAll(req, res, next) {
        try {
            const accountings = await Accountings.findAll({
                include: [Clients, Employees, Services]
            });
            res.status(200).json(accountings);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAllByClientId(req, res, next) {
        try {
            const { id } = req.params;
            const accountings = await Accountings.findAll({ 
                where: { idClient: id },
                include: [Clients, Employees, Services]
            });
            res.status(200).json(accountings);
        } catch (error) {
            console.log(error)
            next(ApiError.internal('Internal Server Error'));
        }
    }


    async getById(req, res, next) {
        const { id } = req.params;

        try {
            const accounting = await Accountings.findByPk(id, {
                include: [Clients, Employees, Services]
            });
            if (!accounting) {
                return res.status(404).json({ message: 'Accounting not found' });
            }
            res.status(200).json(accounting);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { AccountingDate, idClient, idEmployee, idService } = req.body;

        try {
            const accounting = await Accountings.findByPk(id);
            if (!accounting) {
                return res.status(404).json({ message: 'Accounting not found' });
            }

            accounting.AccountingDate = AccountingDate;
            accounting.idClient = idClient;
            accounting.idEmployee = idEmployee;
            accounting.idService = idService;

            await accounting.save();

            res.status(200).json({ Accounting: accounting });
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const accounting = await Accountings.findByPk(id);
            if (!accounting) {
                return res.status(404).json({ message: 'Accounting not found' });
            }

            await accounting.destroy();
            res.status(204).end();
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new AccountingsController();
