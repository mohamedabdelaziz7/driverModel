const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/driverModel');

// Home Page
exports.home = async (req, res) => {
  // Implement home page logic
};

// Get trips history
exports.getTripsHistory = async (req, res) => {
  // Implement trips history logic
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
  // Implement forgot password logic
};

// Reset password
exports.resetPassword = async (req, res) => {
  // Implement reset password logic
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
    res.status(500).json({ error: error.message });
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
