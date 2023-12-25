const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');

// const {addstudent} = require('../db/addstudent.js');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const homepageRoutes = require('./routes/routes.js')
app.use('/', homepageRoutes);

// app.post('/',async (req, res) => {
//   const formData = req.body;
//   const name = req.body.studentName;
//   const roomType = req.body.roomType;
//   const floor = req.body.floor;
// await addstudent(name,roomType,floor);
//   console.log('Form data:', name,roomType,floor);
//   res.send('Form submitted successfully!');
// });
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
});

