const express = require('express');
const router = express.Router();
const stationController = require('../controllers/station.controller');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

// Station routes (public)
router.get('/stations', stationController.getAllStations);
router.get('/stations/:id', stationController.getStationById);

// Booking routes (protected - user only)
router.post('/bookings', authMiddleware, checkRole('user'), bookingController.createBooking);
router.get('/bookings', authMiddleware, checkRole('user'), bookingController.getUserBookings);
router.patch('/bookings/:id/cancel', authMiddleware, checkRole('user'), bookingController.cancelBooking);

module.exports = router;
