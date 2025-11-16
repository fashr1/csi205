const Station = require('../models/Station');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Station Management
exports.createStation = async (req, res) => {
  try {
    const { name, address, lat, lng, total_slots, price_per_hour, amenities } = req.body;

    // Validate input
    if (!name || !address || !lat || !lng || !total_slots || !price_per_hour) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const station = await Station.create({
      name,
      address,
      lat,
      lng,
      total_slots,
      price_per_hour,
      amenities: amenities || [],
    });

    res.status(201).json({
      message: 'Station created successfully',
      station,
    });
  } catch (error) {
    console.error('Create station error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    const updatedStation = await Station.update(id, updateData);

    res.json({
      message: 'Station updated successfully',
      station: updatedStation,
    });
  } catch (error) {
    console.error('Update station error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;

    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    await Station.delete(id);

    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error('Delete station error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Booking Management
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAll();
    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.getAll();
    const stations = await Station.getAll();
    const bookings = await Booking.getAll();

    const stats = {
      totalUsers: users.length,
      totalStations: stations.length,
      totalBookings: bookings.length,
      activeBookings: bookings.filter(b => b.status === 'confirmed').length,
      totalRevenue: bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + parseFloat(b.total_price), 0),
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
