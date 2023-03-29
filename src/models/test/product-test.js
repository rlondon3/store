const chai = require('chai');
const {Product, product_schema} = require("../../models/product");

const expect = chai.expect;

describe("Product Model", () => {
    it("should have a product model", () => {
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
    })

})