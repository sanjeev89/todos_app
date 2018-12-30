var mysql=require('mysql2');

var connection=mysql.createConnection({
    host:'localhost',
    user:'todos',
    password:'todos',
    database:'todos',
    insecureAuth:true
})

function createuser(){
    return new Promise(function(resolve,reject){
        connection.query(
            `CREATE TABLE IF NOT EXISTS users
            (ID INTEGER AUTO_INCREMENT PRIMARY KEY,EMAIL VARCHAR(60),USERNAME VARCHAR(60), PASSWORD VARCHAR(60))
            `
            ),
            function(err,rows){
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve();
                }
            }
    })
}

function adduser(email,username,password){
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO users
            (EMAIL, USERNAME, PASSWORD) 
            VALUES(?,?,?)`,[email, username, password]),
            function(err,rows){
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            }
    })
}

exports=module.exports={
    adduser,createuser
}

