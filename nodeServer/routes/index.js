var express = require('express');
var router = express.Router();
//var connection= require('../public/javascripts/sqlconnect.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article', function(req, res, next) {
  res.render('article.ejs', { title: 'Express' });
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

router.get('/videoPlay', function(req, res, next) {
    let id = req.query.id;
    console.log('get the video id is ',id);
    connection.query(`select * from video where id = ${id}`,(err,rows,fields)=>{
    connection.query(`select * from video `,(err1,rows1,fields1)=>{
        console.log('the rows value is ',rows)
        if(err||rows.length<=0||rows1.length<0||err1){
            console.log(err)
            res.json({
                status:'201',
                msg:'get video list Error'
            })
        }else{
            console.log('video Detail info is ',rows)
            res.render('movieplay.ejs', {
                title: 'Express',
                videodetail:rows[0],
                videoRelative:rows1
            })
        }
    })
    })

})
router.get('/home', function(req, res, next) {
    connection.query(`select * from video`,(err,rows,fields)=>{
        console.log('the rows value is ',rows)
        if(err||rows.length<=0){
            console.log(err)
            res.json({
                status:'201',
                msg:'get video list Error'
            })
        }else{
            res.render('home.ejs', {
                title: 'Express',
                videoList:rows
            })
        }
    })

}).get('/mainList',function(req,res,next){
    console.log('main list info ');
    connection.query(`select * from video`,(err,rows,fields)=>{
        console.log('the rows value is ',rows)
        if(err||rows.length<=0){
            console.log(err)
            res.json({
                status:'201',
                msg:'get video list Error'
            })
        }else{
            res.json({
                status:'200',
                msg:'get video list success'
            })
            }
        })
});

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
