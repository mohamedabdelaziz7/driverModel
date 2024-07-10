const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Auth routes
router.post('/login', driverController.login);
router.post('/register', driverController.register);
router.post('/forgot-password', driverController.forgotPassword);
router.post('/reset-password', driverController.resetPassword);

// Location access
router.post('/location-access', driverController.allowLocationAccess);

// Home page 
router.get('/home', driverController.home);

// Rides
router.get('/trips-history/:driverId', driverController.getTripsHistory);

// Driver profile
router.get('/profile/:driverId', driverController.getProfile);
router.put('/update-profile/:driverId', driverController.updateProfile);

// Reviews and ratings
router.post('/:driverId/review', driverController.addReview);

module.exports = router;

