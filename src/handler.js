const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

exports.register = (req, res) => {
    const { fullName, email, password, age, gender, weight, height } = req.body;
    const query = 'INSERT INTO users (fullName, email, password, age, gender, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.execute(query, [fullName, email, password, age, gender, weight, height], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.execute(query, [email, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send({ message: 'Invalid credentials' });
        res.status(200).send({ message: 'Login successful', user: results[0] });
    });
};

exports.readUser = (req, res) => {
    const { email } = req.query;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send(results[0]);
    });
};

exports.updateUser = (req, res) => {
    const { email, fullName, age, gender, weight, height } = req.body;
    const query = 'UPDATE users SET fullName = ?, age = ?, gender = ?, weight = ?, height = ? WHERE email = ?';
    db.execute(query, [fullName, age, gender, weight, height, email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User updated successfully' });
    });
};

exports.deleteUser = (req, res) => {
    const { email } = req.body;
    const query = 'DELETE FROM users WHERE email = ?';
    db.execute(query, [email], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User deleted successfully' });
    });
};
