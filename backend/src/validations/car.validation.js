const Joi = require('joi');

const getCar = {
    query: Joi.object().keys({
        pageLimit: Joi.string().required(),
        pageCurrent: Joi.string().required(), 
        supplier: Joi.string().allow(''), 
        category: Joi.string().allow(''), 
        searchValue: Joi.string().allow('')
    })
};

const createCar = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().required(),
        supplier: Joi.string().required(),
        cost: Joi.string().required(),
        description: Joi.string().allow('')
    })
};

const getCarById = {
    params: Joi.object().keys({
        id: Joi.required(),
    }),
};

module.exports = {
    getCar,
    createCar,
    getCarById,
}