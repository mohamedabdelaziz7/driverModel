const driverService = require('../services/driverService');

// Create a new driver
async function createDriver(req, res) {
  try {
    const newDriver = await driverService.createDriver(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get driver details by ID
async function getDriverById(req, res) {
  try {
    const driver = await driverService.getDriverById(req.params.driverId);
    if (!driver) {
      res.status(404).json({ message: 'Driver not found' });
    } else {
      res.json(driver);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update driver details by ID
async function updateDriver(req, res) {
  try {
    const updatedDriver = await driverService.updateDriver(req.params.driverId, req.body);
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete driver by ID
async function deleteDriver(req, res) {
  try {
    await driverService.deleteDriver(req.params.driverId);
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
};