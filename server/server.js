const express = require('express');
const dotenv = require('dotenv');

// use .env variables
dotenv.config();

const PORT = process.env.PORT || 5010;

// initializing the server
const app = express();

// parsing incoming requests body
app.use(express.json());

// test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from cardeals server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
