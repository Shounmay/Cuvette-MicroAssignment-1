const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const initializeDatabase = require('./config/db');
const app = express();
const admin = require('./routes/admin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();

app.get('/api/health', (req, res) => {
	res.send({
		time: new Date(),
		server: 'Shuffle Backend',
		status: 'Active',
	});
});

app.use('/api/admin', admin);

app.use((req, res, next) =>
	res.status(404).send('You are looking for something that we not have!')
);

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || 'localhost';

console.log(process.env.PORT);

app.listen(PORT, () => {
	console.log(` Shuffle app listening at http://${HOST}:${PORT}`);
});
