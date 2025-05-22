const express = require('express');
const router = express.Router();
const { addSensorData, getLatestSensorData, controlDevice } = require('../controllers/sensorController');

router.post('/add', addSensorData);           // Appelé par ESP32
router.get('/latest', getLatestSensorData);   // Appelé par le frontend
router.post('/control', controlDevice);       // Appelé par frontend et ESP32

module.exports = router;
