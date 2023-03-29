const chai = require('chai');
const assert = require('assert');
const {User, user_schema, handleUserErrors} = require("../../models/user");

const expect = chai.expect;

const user = new User;
const test_user = {
    first_name: "Ralphie",
    last_name: "London",
    address: "3131 Trap Ave",
    city: "Atlanta",
    state: "GA",
    zip: 30032,
    email: "ralphieLondon@store.com",
    password: "Store1234!",
    username: "BossDev",
}

describe("User Model", () => {
    it("should have a defined model", () => {
        expect(User).to.exist;
    });
});
describe("User Schema", () => {
    it("should be defined", () => {
        expect(user_schema).to.exist;
    });
    it("should have a first name key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('first_name');
    });
    it("should have a last name key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('last_name');
    });
    it("should have an address key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('address');
    });
    it("should have a city key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('city');
    });
    it("should have a state key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('state');
    });
    it("should have zip code key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('zip');
    })
    it("should have a username key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('username');
    });
    it("should have an email key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('email');
    });
    it("should have a password key", () => {
        expect(user_schema.obj)
        .which.is.an('object')
        .and.has.property('password');
    });
});
describe("Test User", () => {
    it("should have a value for id", () => {
        expect(user)
        .which.is.an('object')
        .and.has.property('_id')
        .and.not.equal('undefined');
    });
    it("should have a value first name", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('first_name')
        .and.equal('Ralphie');
    });
    it("should have a value for last name", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('last_name')
        .and.equal('London');
    });
    it("should have a value for address", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('address')
        .and.equal('3131 Trap Ave');
    });
    it("should have a value for city", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('city')
        .and.equal('Atlanta');
    });
    it("should have a value for state", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('state')
        .and.equal('GA');
    });
    it("should have a value zip code", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('zip')
        .and.equal(30032);
    });
    it("should have a value for email", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('email')
        .and.equal('ralphieLondon@store.com');
    });
    it("should have a value for password", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('password')
        .and.equal('Store1234!');
    });
    it("should have a value for username", () => {
        expect(test_user)
        .which.is.an('object')
        .and.has.property('username')
        .and.equal('BossDev');
    });
});
describe("Validate User Method", () => {
    it("should pass test user with correct schema requirements", () => {
        const result = handleUserErrors(test_user);
        expect(result.error).to.equal(undefined);
    });
    it("should fail a user with incorrect schema requirements", () => {
        test_user.password = "1";
        const result = handleUserErrors(test_user);
        assert.rejects(() => {
            const result = handleUserErrors(test_user);
        }, (err) => err === result.error.details[0].message)
    });
   
})
