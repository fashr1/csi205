const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(checkRole('admin'));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// Station management
router.post('/stations', adminController.createStation);
router.put('/stations/:id', adminController.updateStation);
router.delete('/stations/:id', adminController.deleteStation);

// User management
router.get('/users', adminController.getAllUsers);

// Booking management
router.get('/bookings', adminController.getAllBookings);

module.exports = router;
