const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/driverModel');

// Home Page
exports.home = async (req, res) => {
  res.send('Welcome to the Driver API');
};

// Get trips history
exports.getTripsHistory = async (req, res) => {
  // Implementation for trips history
};

// Register
exports.register = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newDriver = new Driver({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login driver
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ driverId: driver._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  // Implementation for forgot password
};

// Reset password
exports.resetPassword = async (req, res) => {
  // Implementation for reset password
};

// Get driver profile
exports.getProfile = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status 500).json({ error: error.message });
  }
};

// Update driver profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.driverId,
      req.body,
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Allow location access
exports.allowLocationAccess = async (req, res) => {
  const { driverId, location } = req.body;

  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    driver.location = location;
    await driver.save();

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add review and rating
exports.addReview = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { userId, rating, comment } = req.body;

    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 0 and 5' });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const review = { user: userId, rating, comment };
    driver.reviews.push(review);

    // Update average rating
    const ratings = driver.reviews.map(review => review.rating);
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = sum / ratings.length;
    driver.rating = averageRating;

    await driver.save();

    res.status(200).json({ averageRating, reviews: driver.reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

