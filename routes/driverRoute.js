const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const locationController = require('../controllers/locationController');
const profileController = require('../controllers/profileController');
const rideController = require('../controllers/rideController');
const driverService = require('../services/driverService');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Location access
router.post('/location-access', locationController.allowLocationAccess);

// Home page 
router.get('/home', rideController.home);

// Rides
router.get('/trips-history/:driverId', rideController.getTripsHistory);

// Driver profile
router.get('/profile/:driverId', profileController.getProfile);
router.put('/update-profile/:driverId', profileController.updateProfile);

// create
router.post('/', async (req, res) => {
  try {
    const newDriver = await driverService.createDriver(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// get
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
// update
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
// delete
router.delete('/:driverId', async (req, res) => {
  try {
    const message = await driverService.deleteDriver(req.params.driverId);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// rate
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


