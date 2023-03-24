const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const mongoUrl = process.env.MONGODB_TEST_URL
mongoose.connect(mongoUrl);

mongoose.connection
	.once('open', () => console.log('Connected!'))
	.on('error', (error) => {
		console.warn('Error : ', error);
	});
	
	// runs before each test
// 	beforeEach((done) => {
// 		mongoose.connection.collections.users.drop(() => {
// 		done();
// 	});
// });
