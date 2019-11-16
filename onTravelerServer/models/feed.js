var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    buddy_id : {type:String, require:true},
    image_path : {type:String, require: true},
    favorite_num : { type:Number, min : 0},
    location_name :String,
    hashtag : [ String ]
});

feedSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


feedSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('feed', feedSchema);