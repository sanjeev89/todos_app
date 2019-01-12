var express = require("express");
var server = express();
var db = require("./db.js");
var path = require("path");

//var insert=require('./routes/routes.js')
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", express.static(path.join(__dirname, "views")));
server.use(express.static("views/images"));

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.get("/", function(req, res) {
  db.createuser()
    .then(function() {})
    .catch(function(err) {
      res.send(err);
    });
  res.render("index"); //to send first index file as a response
});

var tablename;
var flag=0;
server.post("/", function(req, res) {
      db.validateuser(req.body.email,req.body.password)
      .then(function(rows){
        if(Object.keys(rows).length!=1){      
          msg="wrong username or password ";
          res.render('index',{msg})
        }
        else{
          console.log(rows)
         // res.send(rows)
         
          console.log(Object.keys(rows).length);
          console.log(rows[0].ID);
          tablename="pass"+rows[0].ID;
    
          db.todotable(tablename)               //creates the table for particular user
          .then(function(){
              // res.render('todos.hbs',{rows});
          })
          .catch(function(err){
            console.log(err);
          })
          //res.send(rows);
          
          db.viewtodo(tablename)
          .then(function(data){
            console.log(data);
            //res.render('todos',{data});
            console.log("hello world ..");
            res.redirect(`/abc?table=${tablename}`);
           
           // res.redirect(`/${tablename}`);
            todos=data;
          })
          .catch(function(err){
            
            console.log(err);
          })
        }
        
      })
      .catch(function(err){
        console.log(err);                              //able to view me??? try click or change something??? 
      })                                               //try writing soemthing with ur laapy
      
});   //jb user index.hbs waale submit pe click krega tb ye chalega

/*
server.post('/register', function(req,res){
    res.render('register_successful');
})
*/ 

server.get(`/abc`,function(req, res){
     console.log(req.query)
     tablename=req.query.table;
      db.viewtodo(tablename)
      .then(function(data){
        res.render('todos',{data})
      })
      .catch(function(err){
        console.log(err);
      })
})

server.post('/abc', function(req,res){
   tablename=req.query.table;
   db.addTodos(tablename,req.body.data)
   .then(function(){

   })
   .catch(function(err){
     console.log(err);
   })
   res.redirect(`/abc?table=${tablename}`);
   
})

server.get("/register", function(req, res) {
  res.render("register");
}); //jb user index.hbs waale register pe click krega tb ye chalega

server.post("/register", function(req, res) {
  console.log("before add user");
  if (req.body.password != req.body.retypepassword) {
    var obj = { msg: "password didntmatched " };
    console.log(obj);
    //res.send("hello");
    res.render("register", { obj });
  } else {
    db.adduser(req.body.email, req.body.password)
      .then(function() {
        console.log("in then function");
        // res.render('register_successful');
        res.send("Hello");

        //res.render('register_successful');
      })
      .catch(function(err) {
        res.send(err);
      });
    //res.send("Hello")
    res.render("register_successful");
  }
});

server.get("/register_successful", function(req, res) {
  res.render("register_successful");
}); //works at url /regiter successful

server.listen(2000, function() {
  console.log("server started at localhost://2000");
});
