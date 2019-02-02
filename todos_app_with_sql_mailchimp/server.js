var express = require("express");
var server = express();
var db = require("./db.js");
var path = require("path");
var route = require('./routes/routes.js')
var date = require('./routes/date');
var bodyParser = require('body-parser')

//var insert=require('./routes/routes.js')
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", express.static(path.join(__dirname, "views")));
server.use(express.static("views/images"));

server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"));

server.use('/', route);
server.use('/register',route);
server.use('/register_successful', route)
var email;

var tablename;
var flag=0;
server.post("/", function(req, res) {
      email=req.body.email;
      db.validateuser(req.body.email,req.body.password)
      .then(function(rows){                                  //mtlb username ya password galat h
        if(Object.keys(rows).length!=1){      
          msg="wrong username or password ";
          res.render('index',{msg})
        }
        else{                                          //username and password shi h...proceed further
          console.log(rows)
         // res.send(rows)
         
          console.log(Object.keys(rows).length);
          console.log(rows[0].ID);
          tablename="todos";
    
          db.todotable(tablename)               //creates the table for particular user
          .then(function(){
              // res.render('todos.hbs',{rows});
          })
          .catch(function(err){
            console.log(err);
          })
          //res.send(rows);
          console.log("table created successfully!!!!")
          console.log("req.body.email is" +req.body.email)
          
          db.viewtodo(req.body.email)
          .then(function(data){
            console.log(data);
            //res.render('todos',{data});
            console.log("hello world ..");
            res.redirect('/todos');
           
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

server.get(`/todos`,function(req, res){
     console.log(req.query)
     tablename=req.query.table;
      db.viewtodo(email)
      .then(function(data){
        res.render('todos',{data})
      })
      .catch(function(err){
        console.log(err);
      })
})

server.post('/todos', function(req,res){
   tablename=req.query.table;
   console.log(req.body.data);
   console.log("date is "+date.date());
   db.addTodos('todos', email, req.body.data, get_time()+"\t\t"+date.date())
   .then(function(){

   })
   .catch(function(err){
     console.log(err);
   })
   res.redirect('/todos');
   
})

server.delete('/todos', function(req, res){
  console.log(req.body.data);
  console.log("data is "+req.body)
  console.log('req.query is '+req.query);
  console.log("fucked up ");
  
  //console.log("datum is "+datum);
  var data = JSON.stringify(req.body);  //without this line i will see [object,object]....remember this
  console.log(data);
  var obj=JSON.parse(data);
  console.log(obj);
  console.log("here comes the main data "+obj.d);
  db.deltodos(obj.d)
  .then(function(){})
  .catch(function(err){
    console.log(err);
  })
  res.render('todos');
})





server.listen(2000, function() {
  console.log("server started at localhost://2000");
});

function get_time(){
  var time = new Date();
  console.log(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  console.log(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  }