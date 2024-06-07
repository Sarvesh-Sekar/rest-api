const mongoose = require('mongoose')


const user_schema = new  mongoose.Schema(
    {
      name:{type:String , required :true},
      age:{type:Number , required : true},
      date : {type:Date , default : Date.now}  
    }
)

module.exports = mongoose.model('user', user_schema)