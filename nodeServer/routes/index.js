var express = require('express');
var router = express.Router();
var connection= require('../public/javascripts/sqlconnect.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//for register
router.get('/register', function(req, res, next) {
  res.render('login.ejs', {
      title: 'Express',
      path:'register'
  }
  );
}).post('/toRegister',function(req,res,next){
    console.log('register info ',req.body.name,req.body.password)
    connection.query(`insert into user (u_name,password) values ('${req.body.name}','${req.body.password}')`,(err,rows,fields)=>{
        if(err||rows.length<=0){
            console.log(err)
            res.json({
                status:'201',
                msg:'Register Error'
            })
        }else{
            res.json({
                status:'200',
                msg:'Register success'
            })
        }
        }
    )});


router.get('/login', function(req, res, next) {
  res.render('login.ejs', {
      title: 'Express' ,
      path:'login'

  });
  //res.render('index', { title: 'Express' });
}).post('/toLogin', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    console.log(req.body.name,req.body.password);
    connection.query(`select * from user where u_name =${req.body.name} and password = ${req.body.password}`,(err,rows,fields)=>{
        console.log(rows);
        if(err||rows.length<=0){
            res.json({
            status:201,
            msg:'userName or password error'
        })}else{
            res.json({
                status:200,
                msg:'登录成功'
            });
            //res.redirect('address');
        }

    });
    //run sql to select
    //only have crud but you shoud write nice
});
module.exports = router;
