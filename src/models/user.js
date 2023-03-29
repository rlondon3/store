const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");


const user_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50 
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zip : {
        type: Number,
        required: true,
        minlength: 5
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true, // makes sure two users do not have the same email when set to true
    },
    password: { 
        type: String, 
        required: true,
     },
});

user_schema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_PRIVATE_KEY);
    return token;
}

const User = mongoose.model('User', user_schema);

function handleUserErrors(user) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50),
        last_name: Joi.string().min(3).max(50),
        address: Joi.string().min(5).max(100),
        city: Joi.string().min(3).max(50).required(),
        state: Joi.string().max(2).required(),
        zip: Joi.number().min(5).required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ tlds: {allow: false} }),
        password:  new PasswordComplexity({
        min: 8,
        max: 25,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
        }),     
    });
    return schema.validate(user);
}

exports.User = User;
exports.user_schema = user_schema;
exports.handleUserErrors = handleUserErrors;