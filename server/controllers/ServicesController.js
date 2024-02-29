const { Services } = require("../models/models"); 
const ApiError = require('../error/ApiError');

class ServicesController {
    async create(req, res, next) {
        const { ServiceName, ServiceDescription, ServicePrice } = req.body;

        try {
            const newService = await Services.create({ ServiceName, ServiceDescription, ServicePrice }); 
            return res.status(201).json({ Service: newService });
        } catch (error) {
            console.error(error)
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getAll(req, res, next) {
        try {
            const services = await Services.findAll();
            res.status(200).json(services);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;

        try {
            const service = await Services.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { ServiceName, ServiceDescription, ServicePrice } = req.body;

        try {
            const service = await Services.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }

            service.ServiceName = ServiceName;
            service.ServiceDescription = ServiceDescription;
            service.ServicePrice = ServicePrice;

            await service.save();

            res.status(200).json({ Service: service });
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const service = await Services.findByPk(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }

            await service.destroy();
            res.status(204).end();
        } catch (error) {
            next(ApiError.internal('Internal Server Error'));
        }
    }
}

module.exports = new ServicesController();
