const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }, 
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
  license: {
    number: { type: String, required: true },
    type: { type: String, required: true },
    expirationDate: { type: Date },
  },
  ratings: [{ type: Number }],
});

// Create a geospatial index for the location field
driverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
