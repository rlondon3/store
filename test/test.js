const assert = require("assert");
const dotenv = require("dotenv");

//Config environment variables
dotenv.config();

//init Mongoose and connect
const mongoose = require("mongoose");

//DB Environment Variables
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

        return;
    });
    it("shouldnt connect to DB with incorrect prefix", async (done) => {
        conn_invalid = mongoose.createConnection(mongo_invalid_uri);
        const ready = conn_invalid.readyState;
        
        if (assert.equal(ready, 0) === 0) {
            assert.rejects(await conn_invalid.asPromise());
        };
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