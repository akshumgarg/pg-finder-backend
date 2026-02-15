const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  distance: {
    type: String,
    required: true
  },
  nearbyColleges: [{
    name: String,
    distance: String
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  sharingType: {
    type: String,
    enum: ['Single', 'Double Sharing', 'Triple Sharing', 'Four Sharing'],
    required: true
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  amenities: [{
    type: String,
    enum: ['WiFi', 'Meals', 'AC', 'Parking', 'Laundry', 'Security', 'TV', 'Gym', 'Power Backup']
  }],
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Co-living'],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },
  rules: [{
    type: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    ownerName: String
  },
  facilities: {
    roomSize: String,
    bedType: String,
    attached: Boolean,
    balcony: Boolean,
    furnishing: String
  },
  timing: {
    gateClosing: String,
    visitingHours: String
  }
}, {
  timestamps: true
});

// Index for search
pgSchema.index({ name: 'text', location: 'text', address: 'text' });

module.exports = mongoose.model('PG', pgSchema);
