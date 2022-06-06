const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const carSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        supplier: {
            type: String,
            required: true,
            trim: true,
        },
        cost: {
            type: Number,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        thumnail: {
            type: String,
            required: true,
        },
        gallery: {
            type: [{
                type: String
            }]
        }
    }
);

carSchema.plugin(toJSON);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;