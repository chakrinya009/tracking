const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("user", ServiceSchema);



module.exports = Service;
