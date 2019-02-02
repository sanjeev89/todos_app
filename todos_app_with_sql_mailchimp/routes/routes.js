var express=require('express');
var router=express.Router();
var db = require("../db.js");

router.get("/", function(req, res) {
    db.createuser()
      .then(function() {})
      .catch(function(err) {
        res.send(err);
      });
    res.render("index"); //to send first index file as a response
  });

  router.get("/register_successful", function(req, res) {
    res.render("register_successful");
  }); //works at url /regiter successful
  
  router.get("/register", function(req, res) {
    res.render("register");
  }); //jb user index.hbs waale register pe click krega tb ye chalega

  router.post("/register", function(req, res) {
    console.log("before add user");
    if (req.body.password != req.body.retypepassword) {
      var obj = { msg: "password didntmatched " };
      console.log(obj);
      //res.send("hello");
      res.render("register", { obj });
    } 
    else {
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




module.exports=router;