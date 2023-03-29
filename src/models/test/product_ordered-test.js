const chai = require("chai");
const assert = require('assert');
const {Product_Ordered, product_ordered_schema, handleProductOrderedErrors} = require("../../models/product_ordered");
const { Order } = require("../order");
const { Product } = require("../product");

const expect = chai.expect;

const order = new Order;
const product = new Product;
const prod_ordered = new Product_Ordered;

const test_prod_ordered = {
    quantity: 10,
    order_id: order._id,
    product_id: product._id
}

describe("Product Ordered Model", () => {
    it("should have a defined model", () => {
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
});
describe("Test Product Ordered", () => {
    it("should hvae a value for id", () => {
        expect(prod_ordered)
        .which.is.an('object')
        .and.has.property('_id')
        .and.not.equal('undefined');
    });
    it("should have a value for quantity", () => {
        expect(test_prod_ordered)
        .which.is.an('object')
        .and.has.property('quantity')
        .and.equal(10);
    });
    it("should have a value for order_id from order", () => {
        expect(test_prod_ordered)
        .which.is.an('object')
        .and.has.property('order_id')
        .and.equal(order._id);
    });
    it("should have a value for product_id from product", () => {
        expect(test_prod_ordered)
        .which.is.an('object')
        .and.has.property('product_id')
        .and.equal(product._id);
    });
});
describe("Validate Product Ordered Method", () => {
    it("should pass test product ordered with correct schema requirements", () => {
        const result = handleProductOrderedErrors(test_prod_ordered);
        expect(result.error).to.equal(undefined);
    });
    it("should fail a test product ordered with incorrect schema requirements", () => {
        test_prod_ordered.quantity = "1";
        const result = handleProductOrderedErrors(test_prod_ordered);
        assert.rejects(() => {
            console.error(result.error.details[0].message);
        }, (err) => err === result.error.details[0].message)
    });
})