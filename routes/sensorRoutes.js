const express = require('express');
const router = express.Router();
const { addSensorData, getLatestSensorData } = require('../controllers/sensorController');

router.post('/add', addSensorData);           // Appelé par ESP32
router.get('/latest', getLatestSensorData);   // Appelé par le frontend
router.post('/control', async (req, res) => {
    try {
        const { device, state } = req.body;
        // Logique pour gérer le contrôle (par exemple, enregistrer l'état ou envoyer une commande)
        console.log(`Contrôle reçu : ${device} = ${state}`);
        res.status(200).json({ message: `Commande ${device} reçue`, state });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du contrôle" });
    }
});
module.exports = router;
