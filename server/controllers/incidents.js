const createIncident = async (req, res) => {
  try {
    const { location, vehicleType, description } = req.body;
    const user = req.user; // Assuming you have user authentication middleware
    const newIncident = await Incident.create({
      user,
      location,
      vehicleType,
      description,
    });
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: "Error creating incident" });
  }
};
