const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(cookieParser());

app.get('/', (req, res) => {
  let time = new Date().toLocaleTimeString();
  res.json({
    time: time,
    app: 'Auth Backend',
    state: 'Active',
    message: 'All good!',
  });
});

const PORT = 5000;

app.listen(PORT, (req, res) => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
