const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { DateTime } = require('luxon'); 
const app = express();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database('db\database.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
  }
});
const dateTimeWIB = DateTime.now().setZone('Asia/Jakarta');

app.use(cors());

// Create the transactions table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    qty INTEGER,
    datetime TEXT
  );
`);

app.use(express.json());

app.post('/api/checkout', (req, res) => {
  const { items } = req.body;
  // Insert transaction into the database
  const stmt = db.prepare(
    'INSERT INTO transactions (name, price, qty, datetime) VALUES (?, ?, ?, ?)'
  );

  items.forEach((item) => {
    stmt.run(item.name, item.price, item.qty, dateTimeWIB.toISO());
  });

  stmt.finalize((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error logging transaction' });
    }
    return res.status(200).json({ message: 'Transaction logged successfully' });
  });
});

app.get('/api/transactions', (req, res) => {
  const { date } = req.query;

  let query = 'SELECT * FROM transactions';
  const params = [];

  if (date) {
    // Convert the query date to UTC offset +07:00
    const queryDateInWIB = new Date(date + 'T00:00:00+07:00').toISOString();
    
    query += ' WHERE datetime >= ? AND datetime < ?';
    params.push(queryDateInWIB, new Date(new Date(queryDateInWIB).getTime() + 24 * 60 * 60 * 1000).toISOString());
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching transactions:', err.message);
      return res.status(500).json({ error: 'Error fetching transactions' });
    }

    return res.status(200).json(rows);
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
