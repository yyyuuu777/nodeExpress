var express = require('express');
var movie= require('../models/movie');
var User = require('../models/user');
var router = express.Router();
//var connection= require('../public/javascripts/sqlconnect.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article', function(req, res, next) {
  res.render('article.ejs', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('login.ejs', {
      title: 'Express',
      path:'register'
  }
  );
}).post('/toRegister',function(req,res,next){
    console.log('register info ',req.body.name,req.body.password)
    var _user = new User({
        name:req.body.name,
        password:req.body.password
    })
    _user.save((err,user)=>{
        err&&console.log(err)||console.log(user);
    });
   });

router.get('/videoPlay', function(req, res, next) {
    let id = req.query.id;
    console.log('get the id is -->',id);
    movie.findById(id,function(err,movieSingle){
        console.log('get the movie is ',movieSingle);
            err&&console.error(err);

        movie.fetch(function(err,movies){
        console.log('get the movie is ',movies);
            err&&console.error(err);
        res.render('movieplay.ejs',{
            title:'main',
            videoRelative:movies,
            videodetail:movieSingle
            })
        })
        })

})
router.get('/home', function(req, res, next) {
    console.log('-------');
    console.log('get home page if user have logined',req.session.user || "non status");
    movie.fetch(function(err,movies){
        console.log('get the movie is ',movies);
            err&&console.error(err);
        res.render('home.ejs',{
            title:'main',
            videoList:movies
            })
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
    User.findOne({
        name:req.body.name
    },(err,user)=>{
        err&&console.log(err);
        if(!user) {
            return res.json({
                status:201,
                msg:'userName or password error'
            });
        }
        user.comparePassword(req.body.password,(err,isMatch)=>{
            err&&console.log(err);
            req.session.user = isMatch?user:'';
            isMatch&& res.json({
                status:200,
                msg:'login success'
            })||res.json({
                status:201,
                msg:'userName or password error'
            });
            return;
        })
    })
});

// back part
router.get('/admin/uploadpage', function(req, res, next) {
  res.render('back/uploadVideo.ejs', { title: 'Express' });
});

router.post('/admin/upload',(req,res,next)=>{
    //get body param the new Movie obj insert into db
    console.log('test req boyd is --->',req.body)
    console.log('test the data is --->',req.body.title);
    let movieObj = req.body;
    let _movie = new movie({
        title:movieObj.title,
        video_introduce:movieObj.video_introduce,
        video_cover:movieObj.video_cover,
        video_source:movieObj.video_source
    })
    _movie.save((err,movie)=>{
        err&&console.log(err);
        res.redirect('/home');
    })
})

module.exports = router;
