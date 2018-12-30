var express=require('express');
var server=express();
var db=require('./db');

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.set("view engine", "hbs");
server.set("views", "views");

server.get('/',function(req,res){
        res.render('register');
})


server.post('/',function(req,res){

})

server.listen(2000,function(){
    console.log("server started at localhost://2000");
})