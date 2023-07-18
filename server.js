const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');
const Config = require('./config/databaseConfig');

const port = process.env.PORT;

Config.connectDB();
app.listen(port, () => {
	console.log('listening on port ' + port);
});
