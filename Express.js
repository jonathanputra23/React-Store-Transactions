const express = require('express');
const cors = require('cors');
const { DateTime } = require('luxon');
const { createClient } = require('@supabase/supabase-js'); // Import Supabase client

const app = express();
const port = process.env.PORT || 5000;

const supabaseUrl = 'https://krbcatjdkhtyffdtrbew.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYmNhdGpka2h0eWZmZHRyYmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5ODI4ODcsImV4cCI6MjAwODU1ODg4N30.bYuxnZ33qN7ynutXAA8CloL5VdFPy89E5LlwpLjqJlg'; // Replace with your Supabase API key
const supabase = createClient(supabaseUrl, supabaseKey);

const dateTimeWIB = DateTime.now().setZone('Asia/Jakarta');

app.use(cors());
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
  const { items } = req.body;

  const transactions = items.map(item => {
    return {
      name: item.name,
      price: item.price,
      qty: item.qty,
      datetime: dateTimeWIB.toISO(),
    };
  });

  try {
    const { data, error } = await supabase.from('transactions').insert(transactions);

    if (error) {
      console.error('Error logging transaction:', error.message);
      return res.status(500).json({ error: 'Error logging transaction' });
    }

    return res.status(200).json({ message: 'Transaction logged successfully' });
  } catch (error) {
    console.error('Error logging transaction:', error.message);
    return res.status(500).json({ error: 'Error logging transaction' });
  }
});

app.get('/api/transactions', async (req, res) => {
  const { date } = req.query;

  let query = supabase.from('transactions').select('*');
  const startOfDay = dateTimeWIB.startOf('day').toISO();
  const endOfDay = dateTimeWIB.endOf('day').toISO();

  if (date) {
    query = query.range(startOfDay, endOfDay).filter('datetime', 'gte', date);
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching transactions:', error.message);
      return res.status(500).json({ error: 'Error fetching transactions' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    return res.status(500).json({ error: 'Error fetching transactions' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
