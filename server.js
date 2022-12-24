const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const initializeDatabase = require('./config/db');
const app = express();
const admin = require('./routes/admin');
const discover = require('./routes/discover');

app.use(cors());

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
app.use('/api/discover', discover);

//404 not found middleware
app.use((req, res, next) =>
	res.status(404).send('You are looking for something that we not have!')
);

app.use((err, req, res, next) =>
	res.status(500).send('Something went wrong in our server!')
);

const PORT = process.env.PORT || 3000;
const HOST = process.env.host || 'localhost';

console.log(process.env.PORT);

app.listen(PORT, () => {
	console.log(` Shuffle app listening at http://${HOST}:${PORT}`);
});
