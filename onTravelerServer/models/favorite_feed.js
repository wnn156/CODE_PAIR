var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favorite_feedSchema = new Schema({
    feed_id : {type:String, required:true},
    customer_id : {type:String, required:true}
});

favorite_feedSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


favorite_feedSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('favorite_feed', favorite_feedSchema);