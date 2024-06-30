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

async function calculateAverageRating(driverId) {
  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      throw new Error('Driver not found');
    }

    const ratings = driver.ratings;
    if (ratings.length === 0) {
      return 0; 
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = sum / ratings.length;

    //update the driver's average rating in the database
    driver.rating = averageRating;
    await driver.save();

    return averageRating;
  } catch (error) {
    throw new Error(`Error calculating average rating: ${error.message}`);
  }
}

module.exports = {
  createDriver,
  deleteDriver,
  getDriverById,
  updateDriver,
  calculateAverageRating,
};
