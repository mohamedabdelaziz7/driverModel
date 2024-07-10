const Driver = require('../models/driverModel');

async function createDriver(driverData) {
  try {
    const newDriver = await Driver.create(driverData);
    return newDriver;
  } catch (error) {
    throw new Error(`Error creating driver: ${error.message}`);
  }
}

async function deleteDriver(driverId) {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(driverId);
    if (!deletedDriver) {
      throw new Error('Driver not found');
    }
    return 'Driver successfully deleted';
  } catch (error) {
    throw new Error(`Error deleting driver: ${error.message}`);
  }
}

async function getDriverById(driverId) {
  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver;
  } catch (error) {
    throw new Error(`Error fetching driver: ${error.message}`);
  }
}

async function updateDriver(driverId, updateData) {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, { new: true });
    if (!updatedDriver) {
      throw new Error('Driver not found');
    }
    return updatedDriver;
  } catch (error) {
    throw new Error(`Error updating driver: ${error.message}`);
  }
}

module.exports = {
  createDriver,
  deleteDriver,
  getDriverById,
  updateDriver,
};

