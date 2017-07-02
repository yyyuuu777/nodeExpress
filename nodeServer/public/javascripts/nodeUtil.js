(()=>{

    let util= function(){

    }
    util.prototype.log=content=> console.log(`exec the -------${content}------successfuly`);
    module.exports = new util();
})();
