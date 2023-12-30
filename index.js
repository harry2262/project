const express = require('express');
require('dotenv').config()
var cookieParser = require('cookie-parser');
const app = express();

// middleware for encoding url i.e. %20 for +
app.use(express.urlencoded({ extended: true }));

//middleware for parsing cookies
app.use(cookieParser());

//routes
const homepageRoutes = require('./routes/routes.js')
app.use('/', homepageRoutes);

// port to listen for requests
const port = process.env.PORT||3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

