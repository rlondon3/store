const chai = require("chai");
const {Product_Ordered, product_ordered_schema} = require("../../models/product_ordered");

const expect = chai.expect;

describe("Product Ordered", () => {
    it("should have a model", () => {
        expect(Product_Ordered).to.exist;
    });
});
describe("Product Ordered Schema", () => {
    it("should be defined", () => {
        expect(product_ordered_schema).to.exist;
    });
    it("should have a quantity key", () => {
        expect(product_ordered_schema.obj)
        .which.is.an('object')
        .and.has.property('quantity');
    });
    it("should have a product id key", () => {
        expect(product_ordered_schema.obj)
        .which.is.an('object')
        .and.has.property('product_id');
    });
    it("should have an order id key", () => {
        expect(product_ordered_schema.obj)
        .which.is.an('object')
        .and.has.property('order_id');
    });
})