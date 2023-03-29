const mongoose = require("mongoose");
const Joi = require("joi");


const order_schema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    order_status: {
        type: Boolean,
        required: true
    },
});
const Order = mongoose.model("Order", order_schema);

function handleOrderErrors(order) {
    const schema = Joi.object({
        user_id: Joi.required(),
        order_status: Joi.boolean().required(),
    })
    return schema.validate(order);
}

exports.Order = Order;
exports.order_schema = order_schema;
exports.handleOrderErrors = handleOrderErrors;