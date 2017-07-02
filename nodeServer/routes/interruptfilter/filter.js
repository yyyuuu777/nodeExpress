
(()=>{
let router = require('../index.js');
let Filter = function(){
        console.log('-----------init the filter-----------');
        this.start();
    }
    Filter.prototype.start = function(){
        console.log('-----------execute the filter-----------');
        router.all('/*',(req,res,next)=>{
            console.log('-----------execute the filter http-----------');
            let url = req.originUrl;
            console.log('filter interrupt the url is==='+url);
            if("/\.js$/".test(url)||url=="login"||req.session.user){
                next();
                return;
            } else{
                res.redirect('/login');
            }
        })
    }
module.exports = Filter;
})();


