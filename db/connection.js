const mongoose = require("mongoose");

const { DB_NAME } = require("../constants.js");
// const connnect = mongoose.connnect();
const connectDb = async () => {
  try {
    let connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `Mongodb connected succesfully!! with host : ${connection.connection.host}`,
    );
  } catch (err) {
    console.log(`DATABASE connection error : ${err}`);
    process.exit(1);
  }
};

module.exports = { connectDb };
