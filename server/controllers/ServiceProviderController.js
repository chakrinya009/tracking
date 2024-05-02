const ServiceProvider = require("../models/serviceProvider");

const createServiceProvider = async (req, res) => {
  try {
    const { name, location } = req.body; // Assuming you're using Express and handling request body
    const newServiceProvider = new Service({ name, location });
    await newServiceProvider.save();
    res.status(201).json(newServiceProvider);
  } catch (error) {
    res.status(500).json({ error: "Error creating service provider" });
  }
};

// use the middle ware to know which user used

const findNearbyServiceProviders = async (req, res) => {
  try {
    const { userLocation } = req.params;
    const nearbyProviders = await ServiceProvider.find({
      location: { $near: userLocation },
    });
    res.status(200).json(nearbyProviders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching service providers" });
  }
};