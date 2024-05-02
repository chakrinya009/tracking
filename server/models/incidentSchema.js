const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: String, required: true },
  vehicleType: { type: String, required: true },
  description: { type: String },
  // Other relevant fields (e.g., timestamp, status)
});

const Incident = mongoose.model("Incident", incidentSchema);


// const mongoose = require("mongoose");

// const incidentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   location: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   description: { type: String },
//   serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // Link to nearby service provider
//   assistanceRequests: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "AssistanceRequest" },
//   ], // Track assistance requests
//   // Other relevant fields (e.g., timestamp, status)
// });

// const Incident = mongoose.model("Incident", incidentSchema);

// module.exports = Incident;
