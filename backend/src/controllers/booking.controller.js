const Booking = require('../models/Booking');
const Station = require('../models/Station');

exports.createBooking = async (req, res) => {
  try {
    const { station_id, start_time, end_time } = req.body;
    const user_id = req.user.id;

    // Validate input
    if (!station_id || !start_time || !end_time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if station exists
    const station = await Station.findById(station_id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Check if station is active
    if (station.status !== 'active') {
      return res.status(400).json({ message: 'Station is not available for booking' });
    }

    // Check if slots are available
    if (station.available_slots <= 0) {
      return res.status(400).json({ message: 'No available slots at this station' });
    }

    // Check time slot availability
    const isAvailable = await Booking.checkAvailability(station_id, start_time, end_time);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    // Calculate total price
    const start = new Date(start_time);
    const end = new Date(end_time);
    const hours = Math.ceil((end - start) / (1000 * 60 * 60));
    const total_price = hours * parseFloat(station.price_per_hour);

    // Create booking
    const booking = await Booking.create({
      user_id,
      station_id,
      start_time,
      end_time,
      total_price,
    });

    // Update available slots
    await Station.updateAvailableSlots(station_id, -1);

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await Booking.getByUserId(user_id);
    res.json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking belongs to user
    if (booking.user_id !== user_id) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    // Check if booking can be cancelled
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    // Update booking status
    await Booking.updateStatus(id, 'cancelled');

    // Return available slot
    await Station.updateAvailableSlots(booking.station_id, 1);

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
