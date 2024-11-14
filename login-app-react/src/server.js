// server.js
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '22510039',
    database: 'auth_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.post('/auth/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Server error');
        res.status(201).send('User registered');
    });
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('User not found');

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});