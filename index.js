const express = require('express');
require('dotenv').config()
const app = express();
var cookieParser = require('cookie-parser');
const port = process.env.PORT||3001;
// const session = require('express-session');
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret:'helloworld',
//   resave:false,
//   saveUninitialized:false
//
// }))

app.use(cookieParser());
const homepageRoutes = require('./routes/routes.js')
app.use('/', homepageRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

