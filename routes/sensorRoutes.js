const express = require('express');
const router = express.Router();
const { addSensorData, getLatestSensorData } = require('../controllers/sensorController');

router.post('/data', addSensorData); // Changed to /data
router.get('/control', getLatestSensorData); // Changed to /control

module.exports = router;
