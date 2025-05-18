const express = require('express');
const router = express.Router();
const { addSensorData, getLatestSensorData } = require('../controllers/sensorController');

router.post('/add', addSensorData);           // Appelé par ESP32
router.get('/latest', getLatestSensorData);   // Appelé par le frontend

module.exports = router;
