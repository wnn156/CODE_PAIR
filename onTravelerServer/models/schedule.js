var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    buddy_id : {type:String},
    checklist_id : { type:Schema.Types.ObjectId },
    start_time : Date,
    end_time : Date,
    schedule_type : {type:String},
    name : {type:String},
    location : {type:String},
});

scheduleSchema.statics.create = function(data){
    var instance = new this(data);

    return instance.save();
};


scheduleSchema.statics.findAll = function(){
    return this.find({});
};

module.exports = mongoose.model('schedule', scheduleSchema);