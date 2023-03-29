const chai = require('chai');
const assert = require('assert');
const {Product, product_schema, handleProductErrors} = require("../../models/product");

const expect = chai.expect;
const product = new Product;

let test_product = {
    title: "test product",
    description: "I am a test product for the store backend",
    price: 109.99
}

describe("Product Model", () => {
    it("should have a defined product model", () => {
        expect(Product).to.exist;
    });
});

describe("Product Schema", () => {
    it("should be defined", () => {
        expect(product_schema).to.exist;;
    })
    it("should have a title key", () => {
        expect(product_schema.obj)
        .which.is.an('object')
        .and.has.property('title');
    });
    it("should have a description key", () => {
        expect(product_schema.obj)
        .which.is.an('object')
        .and.has.property('description');
    });
    it("should have a price key", () => {
        expect(product_schema.obj)
        .which.is.an('object')
        .and.has.property('price');
    });
});
describe("Test Product", () => {
    it("should have an id", () => {
        expect(product)
        .which.is.an('object')
        .and.has.property('_id')
        .and.not.equal('undefined');
    });
    it("should have a value for title", () => {
        expect(test_product)
        .which.is.an('object')
        .and.has.property('title')
        .and.equal('test product');
    });
    it("should have a value for description", () => {
        expect(test_product)
        .which.is.an('object')
        .and.has.property('description')
        .and.equal('I am a test product for the store backend');
    });
    it("should have a value for price", () => {
        expect(test_product)
        .which.is.an('object')
        .and.has.property('price')
        .and.equal(109.99);
    });
});
describe("Validate Product Method", () => {
    it("should pass test product with correct schema requirements", () => {
        const result = handleProductErrors(test_product);
        expect(result.error).to.equal(undefined);
    });
    it("should fail a test product with incorrect schema requirements", () => {
        test_product.price = "109.99";
        const result = handleProductErrors(test_product);
        assert.rejects(() => {
            const result = handleProductErrors(test_product);
        }, (err) => err === result.error.details[0].message)
    });
})