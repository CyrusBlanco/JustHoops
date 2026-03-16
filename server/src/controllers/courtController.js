import Court from '../models/Court.js';

// @desc    Get all courts
// @route   GET /api/courts
// @access  Public
export const getCourts = async (req, res) => {
  try {
    const { status, minCapacity, maxRate } = req.query;
    
    // Build filter
    let filter = {};
    if (status) filter.status = status;
    if (minCapacity) filter.capacity = { $gte: parseInt(minCapacity) };
    if (maxRate) filter.hourlyRate = { $lte: parseInt(maxRate) };

    const courts = await Court.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courts.length,
      data: courts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single court
// @route   GET /api/courts/:id
// @access  Public
export const getCourt = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);

    if (!court) {
      return res.status(404).json({
        success: false,
        message: 'Court not found'
      });
    }

    res.status(200).json({
      success: true,
      data: court
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new court
// @route   POST /api/courts
// @access  Private (Admin)
export const createCourt = async (req, res) => {
  try {
    const court = await Court.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Court created successfully',
      data: court
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update court
// @route   PUT /api/courts/:id
// @access  Private (Admin)
export const updateCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,  // Return updated document
        runValidators: true  // Run model validators
      }
    );

    if (!court) {
      return res.status(404).json({
        success: false,
        message: 'Court not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Court updated successfully',
      data: court
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete court
// @route   DELETE /api/courts/:id
// @access  Private (Admin)
export const deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);

    if (!court) {
      return res.status(404).json({
        success: false,
        message: 'Court not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Court deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get court statistics
// @route   GET /api/courts/stats
// @access  Public
export const getCourtStats = async (req, res) => {
  try {
    const totalCourts = await Court.countDocuments();
    const availableCourts = await Court.countDocuments({ status: 'available' });
    const occupiedCourts = await Court.countDocuments({ status: 'occupied' });
    const maintenanceCourts = await Court.countDocuments({ status: 'maintenance' });
    
    const avgRating = await Court.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCourts,
        availableCourts,
        occupiedCourts,
        maintenanceCourts,
        avgRating: avgRating[0]?.avgRating || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};