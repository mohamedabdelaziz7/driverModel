const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config.env' }); 
const dbConnection = require('./config/database');
const driverRoute = require('./routes/driverRoute'); 

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Driver API');
});

// Mount Routes
app.use('/api/v1/driver', driverRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
