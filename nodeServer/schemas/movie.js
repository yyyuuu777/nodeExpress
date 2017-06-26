var mongoose = require('mongoose')
var MovieSchema = new mongoose.Schema({
    title:String,
    video_name:String,
    video_introduce:String,
    video_cover:String,
    video_source:String,
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
MovieSchema.pre('save',next=>{
    if(this.isNew){
        this.meta.createdAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updataAt = Date.now();
    }
    next();
})

MovieSchema.statics={
    fetch:cb=>{
        this.find({})
        .sort('meta.updateAt')
        exec(cb)
    },
    findById:cb=>{
        this.findOne({
            _id:id
        })
        exec(cb)
    }
}

module.exports = MovieSchema;
