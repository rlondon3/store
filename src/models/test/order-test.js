const chai = require('chai');
const {Order, order_schema} = require("../../models/order");

const expect = chai.expect;

describe("Order", () => {
    it("should have model", () => {
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