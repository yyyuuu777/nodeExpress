var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login.ejs', { title: 'Express' });
  //res.render('index', { title: 'Express' });
});

//todo://how to detal data use new interface ?
//how to use in your company
router.post('/toLogin', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    console.log(req.body.name);
    res.json({
        result:'success'
    })
    //run sql to select
    //only have crud but you shoud write nice
});
module.exports = router;
