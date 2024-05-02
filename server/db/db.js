const mongoose = require("mongoose");

let mongooseURL = `mongodb+srv://chakrinya:chakrinya009@nodeprojects.giz5b0e.mongodb.net/notes?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false); //i added see what it means

const connectToMongoose = () => {
  mongoose.connect(mongooseURL, () => {
    console.log("Connected to mongoose");
  });
};

module.exports = connectToMongoose;
