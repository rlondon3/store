const mongoose = require("mongoose");
const Joi = require("joi");
const { order_schema } = require("./order");
const { product_schema } = require("./product");


const product_ordered_schema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});
const Product_Ordered = mongoose.model("Product_Order", product_ordered_schema);

function handleProductOrderedErrors(productOrdered) {
    const schema = Joi.object({
        quantity: Joi.number().required(),
        order_id: Joi.required(),
        product_id: Joi.required()
    })
    return schema.validate(productOrdered);
}

exports.Product_Ordered = Product_Ordered;
exports.product_ordered_schema = product_ordered_schema;
exports.handleProductOrderedErrors = handleProductOrderedErrors;