var mongoose = require('mongoose')
var bcrypt = require('bcrypt');
var SALT_WORD_FACTOR = 7;
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password: String ,
    meta:{
        createdAt:{
                type:Date,
                default:Date.now()
        },
        updateAt:{
                type:Date,
                default:Date.now()
            }
        } })
UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createdAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updataAt = Date.now();
    }
    bcrypt.genSalt(SALT_WORD_FACTOR ,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            console.log('generate success hash is ',hash)
            user.password = hash;
            console.log('after change password--->',user.password);
            next();
        })
    })
    //next();
})

UserSchema.methods = {
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,(err,isMatch)=>{
            if(err) return err;
            cb(null,isMatch);
        })
    }
}

UserSchema.statics={
    fetch:function(cb){
        console.log('db---------find all-------')
       return this.find({})
       .sort('meta.updateAt')
       .exec(cb)
    },
    findById:function(id,cb){
        this.findOne({
            _id:id
        })
        .exec(cb)
    }
}

module.exports = UserSchema;
