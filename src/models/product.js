const mongoose = require("mongoose");
const Joi = require("joi");


const product_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 250,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model("Product", product_schema);

function handleProductErrors(product) {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(10).max(250).required(),
        price: Joi.number().required()
    })
    return schema.validate(product);
}

exports.Product= Product;
exports.product_schema= product_schema;
exports.handleProductErrors = handleProductErrors;