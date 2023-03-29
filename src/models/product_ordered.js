const mongoose = require("mongoose");
const Joi = require("joi");
const { order_schema } = require("./order");
const { product_schema } = require("./product");


const product_ordered_schema = new mongoose.Schema({
    quantity: { //This application does not have a user model. Will either need to add or find another method
        type: Number,
        required: true
    },
    order_id: {
        type: order_schema,
        required: true
    },
    product_id: {
        type: product_schema,
        required: true
    }
});
const Product_Ordered = mongoose.model("Product_Order", product_ordered_schema);

function handleProductOrderedErrors(productOrdered) {
    const schema = Joi.object({
        quantity: Joi.number().required(),
        order_id: Joi.string().required(),
        product_id: Joi.string().required()
    })
    return schema.validate(productOrdered);
}

exports.Product_Ordered = Product_Ordered;
exports.product_ordered_schema = product_ordered_schema;
exports.handleProductOrderedErrors = handleProductOrderedErrors;