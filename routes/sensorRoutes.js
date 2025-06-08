const express = require('express');
const router = express.Router();
const { addSensorData, getLatestSensorData } = require('../controllers/sensorController');

// Stockage des états des LEDs (persistant en mémoire)
let ledStates = { red: false, yellow: false, green: false };

router.post('/add', addSensorData);           // Appelé par ESP32
router.get('/latest', getLatestSensorData);   // Appelé par le frontend

// Endpoint pour recevoir les commandes de contrôle
router.post('/control', (req, res) => {
    try {
        const { red, yellow, green } = req.body;
        ledStates = {
            red: typeof red === 'boolean' ? red : ledStates.red,
            yellow: typeof yellow === 'boolean' ? yellow : ledStates.yellow,
            green: typeof green === 'boolean' ? green : ledStates.green
        };
        console.log('États des LEDs mis à jour :', ledStates);
        res.status(200).json({ message: 'Commandes reçues', ledStates });
    } catch (error) {
        console.error('Erreur lors du contrôle :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Endpoint pour envoyer les états des LEDs à l’Arduino
router.get('/control', (req, res) => {
    try {
        res.status(200).json(ledStates);
    } catch (error) {
        console.error('Erreur lors de la récupération des états :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
