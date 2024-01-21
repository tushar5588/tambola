var Joi = require("joi");

exports.get = Joi.object({
    page_number: Joi.number().required(),
    page_size: Joi.number().required(),
});

exports.create = Joi.object({
    sets: Joi.number().required()
});