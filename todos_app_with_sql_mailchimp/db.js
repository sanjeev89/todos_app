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
            `CREATE TABLE IF NOT EXISTS login
            (ID INTEGER AUTO_INCREMENT PRIMARY KEY,EMAIL VARCHAR(60), PASSWORD VARCHAR(60))
            `
            ),
            function(err,rows, col){
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve(col);
                }
            }
    })
}

function adduser(email, password){
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO login
            (EMAIL, PASSWORD)
            VALUES(?,?)`,[email, password]),
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

function addTodos(tablename,todos){
    return new Promise(function(resolve ,reject){
        connection.query(
            `INSERT INTO ${tablename}
             (EMAIL,TODOS)
             VALUES(?,?)`,["dummy",todos],
             function(err,rows){
                 if(err){
                     reject(err);
                 }
                 else{
                     resolve();
                 }
             }
        )
    })
}
function validateuser(email,password){
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT * FROM login WHERE EMAIL = "${email}" AND PASSWORD = "${password}";
            `,
            function(err, rows, cols){
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            }

        )
    })
}

function viewtodo(tablename){
    return new Promise(function(resolve,reject){
        connection.query(
            `SELECT TODOS FROM ${tablename};
            `,
            function(err,rows,cols){
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            }

        )
    })
}

function todotable(tablename){
   // console.log(tablename);
    return new Promise(function(resolve,reject){
        connection.query(
            `CREATE TABLE IF NOT EXISTS ${tablename}
            (ID INTEGER AUTO_INCREMENT PRIMARY KEY,EMAIL VARCHAR(60), TODOS VARCHAR(1000))
            `,
            function(err, rows, cols){
                if(err){
                    reject(err);
                }
                else{
                    resolve(cols);
                }
            }
        )
    })
}




exports=module.exports={
    adduser,createuser,validateuser,todotable,viewtodo,addTodos
}

