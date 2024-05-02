const mongoose = require("mongoose");

const assistanceRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  breakdownIncident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },
  // Other relevant fields (e.g., timestamp)
});

const AssistanceRequest = mongoose.model(
  "AssistanceRequest",
  assistanceRequestSchema
);

module.exports = AssistanceRequest;
