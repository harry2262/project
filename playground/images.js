const express = require('express')

require('dotenv').config()
const pool = require('/home/batth/code/project/project/model/db')
const { upload } = require('../middlewares/multer.midddleware');
const app = express();
const path = require('path');
const fs = require('fs');
const { uploadOnCloudinary } = require('/home/batth/code/project/project/utils/upload.util')
app.use(express.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/images/:id', async (req, res) => {

  const id = req.params.id;
  try {
    const result = await pool.query('select data from images where id=$1', [id]);

    const data = result.rows[0];
    res.setHeader('Content-Type', 'image/jpeg');

    res.send(data.data);
  }
  catch (err) {
    console.log(`err is ${err}`);
    res.status(500).send('internal server error');
  }

});

app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'upload.html'));
})
app.post('/upload', upload.single('image'), async (req, res) => {
  try {

    const { filename, path } = req.file;
    response = await uploadOnCloudinary(path);
    if (response == null) {
      throw Error('file uploading failed');
    }
    fs.readFile(path, async (err, imageData) => {


      console.log(filename, path, imageData);

      /*     console.log(`image saved with id : ${result.rows[0].id}`); */
      // // const result = aw/* ait pool.query("sel */ect * from public.users");
      //   console.log(pool);
      res.send('file uploaded succesfully');







    });
  }

  catch (err) {

    console.log(`err : ${err}`);
    res.status(500).send('try again');
  }
  console.log(req.file);


})
app.listen(3000, () => {

  console.log('app is listening on 3000');

})
