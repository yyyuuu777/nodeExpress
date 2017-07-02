var express = require('express');
var movie= require('../models/movie');
var User = require('../models/user');
var util = require('../public/javascripts/nodeUtil');
var router = express.Router();
//var connection= require('../public/javascripts/sqlconnect.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/*',(req,res,next)=>{
    console.log('-----------execute the filter http-----------');
    let url = req.url;
    console.log('filter interrupt the url is==='+url+"session info is"+req.session.user);
    if(url.match(/\.js$/)||url=="/login"||url=="/register"||url=="/toLogin"||url=="/toRegister"||req.session.user){
        console.log('======mathch success========')
        next();
        return;
    } else{
        res.redirect('/login');
    }
})

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
    console.log('register info ',req.body.user_name,req.body.password)
    var _user = new User({
        name:req.body.user_name,
        password:req.body.user_password
    })
    _user.save((err,user)=>{
        if(err){
            console.log('register err the error info is'+err);
        }else{
            //just because your data submit method
            res.redirect('/home');
            console.log('register success ');
             req.session.user = user;
        }

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
    console.log('-----------------line------------------------');
    console.log('get home page if user have logined',req.session.user || "non status");
    movie.fetch(function(err,movies){
        //console.log('get the movie is ',movies);
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
    console.log('login get the request param is ',req.body.user_name,req.body.user_password);
    User.findOne({
        name:req.body.user_name
    },(err,user)=>{
        err&&console.log(err);
        if(!user) {
            return res.json({
                status:201,
                msg:'userName or password error'
            });
            return;
        }
        user.comparePassword(req.body.user_password,(err,isMatch)=>{
            err&&console.log(err);
            req.session.user = isMatch?user:'';
            isMatch&& res.redirect('/home');
            isMatch&&util.log('');
            return;
        })
    })
});

//========== back part =============
router.get('/admin/uploadpage', function(req, res, next) {
  res.render('back/backBase.ejs',
        {
            title: 'Express',
            path:'upload'
        });
});

router.get('/admin/user', function(req, res, next) {
        User.fetch(function(err,users){
        console.log('get the movie is ',users);
            err&&console.error(err);
        res.render('back/backBase.ejs',{
            title:'main',
            userList:users,
            path:'user'
            })
        })
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
