var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    buddy_id : {type:String, require:true},
    image_path : {type:String, require: true},
});

profileSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


profileSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('profile', profileSchema);