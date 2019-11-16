var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favorite_buddySchema = new Schema({
    buddy_id : {type:String, required:true},
    customer_id : {type:String, required:true}
});

favorite_buddySchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


favorite_buddySchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('favorite_buddy', favorite_buddySchema);