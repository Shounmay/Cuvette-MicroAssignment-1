const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const initializeDatabase = require('./config/db');
const app = express();

initializeDatabase();

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || 'localhost';

console.log(process.env.PORT);

app.listen(PORT, () => {
	console.log(` Shuffle app listening at http://${HOST}:${PORT}`);
});
