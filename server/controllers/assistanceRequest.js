const AssistanceRequest = require("../models/assistanceRequest");

// Controller to create a new assistance request
exports.createAssistanceRequest = async (req, res) => {
  try {
    const { userId, breakdownIncidentId, serviceProviderId } = req.body;

    // Create a new assistance request
    const assistanceRequest = new AssistanceRequest({
      user: userId,
      breakdownIncident: breakdownIncidentId,
      serviceProvider: serviceProviderId,
    });

    // Save the new assistance request to the database
    await assistanceRequest.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Assistance request created successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create assistance request" });
  }
};

// Controller to update the status of an assistance request
exports.updateAssistanceRequestStatus = async (req, res) => {
  try {
    const { requestId, newStatus } = req.body;

    // Find the assistance request by its ID
    const assistanceRequest = await AssistanceRequest.findById(requestId);

    if (!assistanceRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Assistance request not found" });
    }

    // Update the status of the assistance request
    assistanceRequest.status = newStatus;

    // Save the updated assistance request to the database
    await assistanceRequest.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Assistance request status updated successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update assistance request status",
      });
  }
};
