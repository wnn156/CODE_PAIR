var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post_scriptSchema = new Schema({
    buddy_id : {type:String, require: true},
    customer_id : {type:String, require: true},
    grade : {type : Number, default : 0, min:0, max:5},
    comments : {type:String}
});

post_scriptSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


post_scriptSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('postScript', post_scriptSchema);