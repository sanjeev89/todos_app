var routes=require('express').Router();

routes.get('/', function(req,res){
    res.render('../views/inner_view/tab_insert');
})

routes.post('/', function(req,res){
    db.insert()
})

module.exports=routes;