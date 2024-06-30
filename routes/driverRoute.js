const express = require('express');
const router = express.Router();
const driverService = require('../services/driverService');

// Create a new driver
router.post('/', async (req, res) => {
  try {
    const newDriver = await driverService.createDriver(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific driver by ID
router.get('/:driverId', async (req, res) => {
  try {
    const driver = await driverService.getDriverById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update driver details
router.put('/:driverId', async (req, res) => {
  try {
    const updatedDriver = await driverService.updateDriver(req.params.driverId, req.body);
    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a driver by ID
router.delete('/:driverId', async (req, res) => {
  try {
    const message = await driverService.deleteDriver(req.params.driverId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a rating to a driver
router.post('/:driverId/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 0 and 5' });
    }

    const driver = await driverService.getDriverById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    driver.ratings.push(rating);
    await driver.save();

    const averageRating = await driverService.calculateAverageRating(req.params.driverId);

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

