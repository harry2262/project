const pool = require('../model/db');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const saltRounds=10;
 const  loadHomepage = async(req,res) => {
  
  res.setHeader("set-cookie",["setfromserver=1"]);
  res.cookie('userdata','newuser',{httpOnly:true});  
  const sessionId = req.cookies.sessionid; 
  if(sessionId===undefined){
res.sendFile("/home/batth/sanjha/code/winter23/project/public/login.html");
  }
  else{
    const user = await validateUser(sessionId);
    if(user===null){
res.sendFile("/home/batth/sanjha/code/winter23/project/public/login.html");
    }
    else{
 
    res.send(`hello ${user}!!`);


    }
  }
  
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

const login = async(req,res)=>{
  
  username = req.body.loginUsername;
 password = req.body.loginPassword;
 result = await pool.query("select * from public.users where username=$1",[username]); 
    if(result.rows.length==0){
     res.send('Authentication failed');
     
    }
    else{
      
       hash = result.rows[0].password;
       result = await bcrypt.compare(password, hash);
    if(result===true){
    const sessionId = generateRandomString();
    await pool.query(`update public.users set sessionid = $1 where username = $2`,[sessionId,username]) 

    res.setHeader('set-cookie',[`sessionid=${sessionId};httponly;samesite=lax`]);
    res.send("authentication succesful");

            }
    
    else{
    res.send("authentication failed");
    }
      
    }

}
    

const validateUser= async(sessionId)=>{

user  = await pool.query("select username from public.users where sessionid=$1",[sessionId]);
if(user.rowCount===0){
return null;
}
  else{

return user.rows[0].username;
  }
}



function generateRandomString(){
return crypto.randomBytes(64).toString('hex');  
} 
 module.exports = {loadHomepage,register,login};
