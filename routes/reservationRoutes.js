const express = require('express');
const router = express.Router();
const {
    createReservation,
    getUserReservations,
    updateReservationStatus,
    getAllReservations
} = require('../controllers/reservationController');

// Get all reservations
router.get('/', getAllReservations);

// Create a new reservation
router.post('/', createReservation);

// Get user's reservations
router.get('/user/:userId', getUserReservations);

// Update reservation status
router.put('/:id', updateReservationStatus);

module.exports = router;
