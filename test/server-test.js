const assert = require('assert');
const chai = require('chai');
const dotenv = require("dotenv");
const supertest = require('supertest');
const {port, server } = require("../src/server");

const request = supertest(server);

//Init Chai expect
const expect = chai.expect;

//Config environment variables
dotenv.config();

//init Mongoose
const mongoose = require("mongoose");

//Environment Variables
const mongo_test_uri = process.env.SPEC_TEST_DB;
const mongo_dev_uri = process.env.DEV_MONGODB;
const mongo_invalid_uri = process.env.INVALID_DB;

describe('Mongoose', () => {
    let conn_dev;
    let conn_test;
    let conn_invalid;
    
    before("create connection", async () => {
        conn_dev  = await mongoose.createConnection(mongo_test_uri).asPromise();
        conn_test = await mongoose.createConnection(mongo_dev_uri).asPromise();
        assert.rejects(async () => {
            conn_invalid = await mongoose.createConnection(mongo_invalid_uri).asPromise();
        }, (err) => err === 'Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"');

        return;
    });
    it("shouldnt connect to DB with incorrect prefix", async (done) => {
        let conn_invalid = mongoose.createConnection(mongo_invalid_uri);
        const ready = conn_invalid.readyState;

        assert.equal(ready, 0);
        done();
    });
    it("should connect to Spec Test DB", async (done) => {
        const ready = conn_test.readyState;
        
        assert.equal(ready, 1);
        done();
    });
    it("should connect to Dev DB", async (done) => {
        const ready = conn_dev.readyState;
        
        assert.equal(ready, 1);
        done();
    });
});
describe('Port Definition', () => {
    it ('should be defined', (done) => {
        expect(port).to.exist;
        done();
    });
})
describe('Express', () => {
    before((done) => {
        server.close();
        server.listen(port, () => {
            console.log(`spec test server should open on port ${port}`);
            done();
        });
    });
    after(() => {
        server.close();
        console.log(`spec test server should close on port ${port}`);
    });
    it('spec test server should connect with status 200', async () => {
        return await request.get('/', (req, res) => {
            expect(res.status).to.equal(200);
        });
    });
});
