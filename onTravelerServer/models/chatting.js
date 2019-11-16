var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chattingSchema = new Schema({
    customer_id : {type:String, require:true},
    buddy_id : {type:String, require: true},
    chat_list : [String]
});


chattingSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


chattingSchema.statics.findAll = function(){
    return this.find({})
};


module.exports = mongoose.model('chatting', chattingSchema);