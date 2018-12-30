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
            (ID INTEGER PRIMARY KEY AUTO_INCREMENT,EMAIL VARCHAR(60),PASSWORD VARCHAR(60)
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

function adduser(email,password){
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO users
            (EMAIL,PASSWORD) 
            VALUES(?,?,?)`,[email,password]),
            function(err,rows,cols){
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            }
    })
}

exports=module.exports={
    adduser,createuser
}

