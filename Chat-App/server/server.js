const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port ', port);
});
