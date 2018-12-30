var express=require('express');
var server=express();
var db=require('./db.js');

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.set("view engine", "hbs");
server.set("views", "views");

server.get('/',function(req,res){
    db.createuser()
    .then(function(){

    })
    .catch(function(err){
        res.send(err);
    })   
    res.render('index');
})

server.post('/', function(req,res){

})  //jb user index.hbs waale submit pe click krega tb ye chalega

/*
server.post('/register', function(req,res){
    res.render('register_successful');
})
*/
server.get('/register', function(req,res){
    res.render('register.hbs');
})   //jb user index.hbs waale register pe click krega tb ye chalega

server.use(express.static('views/images'));

server.post('/register',function(req,res){
        db.adduser(req.body.email,req.body.username, req.body.password)
        .then(function(){
            // res.render('register_successful');
            res.send("Hello")
           
            //res.render('register_successful');
            
        })
        .catch(function(err){
            res.send(err);
        })
})

server.get('/register_successful',function(req,res){
      
    res.render('register_successful');
})



server.listen(2000,function(){
    console.log("server started at localhost://2000");
})