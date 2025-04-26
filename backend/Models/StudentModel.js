const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const StudentSchema=new Schema({
  id:{
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  dob:{
    type: Date,
    required: true
  },
  department:{
    type: String,
    required: true
  },
  enrollmentyear:{
    type: Number,
    required: true
  },
  isactive:{
    type: Boolean,
    default: true
  }

});
const StudentModel=mongoose.model('student',StudentSchema);
module.exports=StudentModel;
