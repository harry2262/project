const pool = require('../model/db');
const bcrypt = require('bcrypt');
const saltRounds=10;
 const loadHomepage = (req,res) => {
    res.sendFile("/home/batth/sanjha/code/winter23/project/public/login.html"); 
}
 const register = (req,res)=>{
   
    username = req.body.registerUsername;
 password = req.body.registerPassword;
pool.query('select username from public.users where username = $1',[username],(err,result)=>{
if(err) {throw err;}
    else{
      if(result.rows.length){
          res.send('user already exist');
      }
      else{
        bcrypt.hash(password,saltRounds,(err,hash)=>{
          if(err){throw err;}
          else{pool.query('insert into public.users values ($1,$2)',[username,hash],(err,result)=>{
            if(err) throw err;
          else{
              res.send('user added succesfully');
          }
         
        })
      }
        })
        
      
      }
    }
    })};

const login = (req,res)=>{
 username = req.body.loginUsername;
 password = req.body.loginPassword;
 
  pool.query("select password from public.users where username=$1",[username],(err,result)=>{
if(err) throw err;
    
    if(result.rows.length==0){
     res.send('Authentication failed');
     
    }
    else{
       hash = result.rows[0].password;
       bcrypt.compare(password, hash, function(err, result) {
    if(err) throw err;
    else{
    if(result===true){
    res.send("authentication succesful");
    }
    else{
    res.send("authentication failed");
    }
    
    } 
});
    }


  })



}

 module.exports = {loadHomepage,register,login};
