const {v2 } = require('cloudinary');
const fs = require('fs');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,"../.env")})
v2.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret : process.env.CLOUDINARY_SECRET 
});


const uploadOnCloudinary = async(localFilePath)=>{

try{
  const response = await v2.uploader.upload(localFilePath,{
   resource_type:"auto"
  })


  fs.unlinkSync(localFilePath);
 return response;
  }
  catch(err){
    console.log(err);
   fs.unlinkSync(localFilePath)
    return null

  }

}
console.log(process.env)
module.exports=  {uploadOnCloudinary}





