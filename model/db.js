const Pool = require('pg').Pool;

const pool = new Pool({
        user:"postgres",
        password:"mysecretpassword",
        host:"localhost",
        port:5432,
        database:"test_db"
});
module.exports= pool;
