const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  driverLicense: { type: String, required: true }, // URL or path to the uploaded license image
  idCard: { type: String, required: true }, // URL or path to the uploaded ID card or passport image
  licenseNumber: { type: String, required: true },
  licenseExpirationDate: { type: Date, required: true },
  birthDate: { type: Date, required: true },
  status: { type: String, default: 'available' },
  nationalId: { type: String, required: true, minlength: 14, maxlength: 14 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  availability: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  ratings: [{ type: Number }],
});

// Create a geospatial index for the location field
driverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
