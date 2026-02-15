const express = require('express');
const router = express.Router();
const PG = require('../models/PG');

// Get all PGs with filters
router.get('/', async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      sharingType,
      gender,
      amenities,
      maxDistance,
      available
    } = req.query;

    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Sharing type filter
    if (sharingType) {
      const types = Array.isArray(sharingType) ? sharingType : [sharingType];
      query.sharingType = { $in: types };
    }

    // Gender filter
    if (gender && gender !== 'all') {
      query.gender = gender;
    }

    // Amenities filter
    if (amenities) {
      const amenitiesList = Array.isArray(amenities) ? amenities : [amenities];
      query.amenities = { $all: amenitiesList };
    }

    // Available filter
    if (available !== undefined) {
      query.available = available === 'true';
    }

    const pgs = await PG.find(query).sort({ createdAt: -1 });

    // Distance filter (client-side for now, can be improved with geospatial queries)
    let filteredPGs = pgs;
    if (maxDistance) {
      filteredPGs = pgs.filter(pg => {
        const distance = parseFloat(pg.distance.split(' ')[0]);
        return distance <= parseFloat(maxDistance);
      });
    }

    res.json({
      success: true,
      count: filteredPGs.length,
      data: filteredPGs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get single PG by ID
router.get('/:id', async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found'
      });
    }

    res.json({
      success: true,
      data: pg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Create new PG (admin/owner only)
router.post('/', async (req, res) => {
  try {
    const pg = await PG.create(req.body);

    res.status(201).json({
      success: true,
      data: pg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create PG',
      error: error.message
    });
  }
});

// Update PG
router.put('/:id', async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found'
      });
    }

    res.json({
      success: true,
      data: pg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update PG',
      error: error.message
    });
  }
});

// Delete PG
router.delete('/:id', async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found'
      });
    }

    // Note: In production, you'd verify JWT token here
    // For now, we'll delete it (frontend checks ownership)
    await PG.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'PG deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Add review to PG
router.post('/:id/reviews', async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    const pg = await PG.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found'
      });
    }

    pg.reviews.push({ user, rating, comment });

    // Update average rating
    const totalRating = pg.reviews.reduce((acc, review) => acc + review.rating, 0);
    pg.rating = totalRating / pg.reviews.length;

    await pg.save();

    res.json({
      success: true,
      data: pg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
});

module.exports = router;
