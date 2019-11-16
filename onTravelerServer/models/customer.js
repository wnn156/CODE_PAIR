var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customer_id : {type:String, required : true , unique: true},
    name : { type : String, required : true },
    nickname : { type: String, default:'name', required : true},
    hashtag : [String]
});

customerSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


customerSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('customer', customerSchema);