const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
mongoose.set('strictQuery', false) //Deprecation coming in Mongo 7

const app = express();
const port = process.env.PORT || 5003;

//Connect to DBs
process.env.TEST_ENV.trim() === 'test' ?
    mongoose.connect(process.env.SPEC_TEST_DB)
    .then(() => console.log('Connected to Store Backend Spec Test Database...'))
    .catch((err) => console.error(`Could not connect to Store Backend Spec Test Database: ${err}`))
:
process.env.DEV_ENV.trim() === 'dev' ?
    mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Connected to Store Backend Development Database...'))
    .catch((err) => console.error(`Could not connect to Store Backend Spec Test Database: ${err}`))
:
console.error('Could not connect to databases!');

//Enable Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable cors
app.use(cors());

const server = app.listen(port, () => console.log(`Development Server Started On ${port}.`));

app.get('/', (req, res) => {
    res.send('Store server open...');
});

module.exports = {
    port: port,
    server: server
};