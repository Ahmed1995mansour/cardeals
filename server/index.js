import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import listingRouter from './routes/listing.route.js';
import tradeRouter from './routes/trade.route.js';
import path from 'path';
// use .env variables
dotenv.config();

const PORT = process.env.PORT || 5010;
const DBURL = process.env.MONGODB_URL;

// connect to DB
mongoose
  .connect(DBURL)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(error => console.log(error));

const __dirname = path.resolve();

// initializing the server
const app = express();

// parsing incoming requests body
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);
app.use('/api/trade', tradeRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
});

// test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from cardeals server!' });
});

// handling errors
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
