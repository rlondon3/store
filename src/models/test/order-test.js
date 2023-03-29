const chai = require('chai');
const assert = require('assert');
const {Order, order_schema, handleOrderErrors} = require("../../models/order");
const { User } = require("../user");

const expect = chai.expect;
const user = new User;
const order = new Order;
const test_order = {
    user_id: user._id,
    order_status: true
}

describe("Order Model", () => {
    it("should have defined model", () => {
        expect(Order).to.exist;
    });
});
describe("Order Schema", () => {
    it("should be defined", () => {
        expect(order_schema).to.exist;
    });
    it("should have a user id key", () => {
        expect(order_schema.obj)
        .which.is.an('object')
        .and.has.property('user_id')
    });
    it("should have an order status key", () => {
        expect(order_schema.obj)
        .which.is.an('object')
        .and.has.property('order_status')
    });
});
describe("Test Order", () => {
    it("should have a value for id", () => {
        expect(order)
        .which.is.an('object')
        .and.has.property('_id')
        .and.not.equal('undefined');
    });
    it("should have a value for user id", () => {
        expect(test_order)
        .which.is.an('object')
        .and.has.property('user_id')
        .and.equal(user._id);
    });
    it("should have a value for order status", () => {
        expect(test_order)
        .which.is.an('object')
        .and.has.property('order_status')
        .and.equal(true);
    });
});
describe("Validate Order Method", () => {
    it("should pass test user with correct schema requirements", () => {
        const result = handleOrderErrors(test_order);
        expect(result.error).to.equal(undefined);
    });
    it("should fail a user with incorrect schema requirements", () => {
        test_order.order_status = "false";
        const result = handleOrderErrors(test_order);
        assert.rejects(() => {
            console.error(result.error.details[0].message)
        }, (err) => err === result.error.details[0].message)
    });
})