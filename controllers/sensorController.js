const SensorData = require('../models/SensorData');

// Ajouter une nouvelle donnée
exports.addSensorData = async (req, res) => {
  try {
    const { temperature, humidite, luminosite } = req.body;
    const data = new SensorData({ temperature, humidite, luminosite });
    await data.save();
    res.status(201).json({ message: "Données enregistrées", data });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
};

// Récupérer la dernière donnée
exports.getLatestSensorData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 });
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};

// Contrôler un appareil (LED ou ventilateur)
exports.controlDevice = async (req, res) => {
  try {
    const { device, state } = req.body;
    if (!device || state === undefined) {
      return res.status(400).json({ error: "Device and state are required" });
    }
    // Store or process the control command (e.g., save to a database or broadcast)
    console.log(`Control command: ${device} -> ${state ? 'ON' : 'OFF'}`);
    res.status(200).json({ message: `Commande envoyée: ${device} -> ${state ? 'ON' : 'OFF'}` });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du contrôle de l'appareil" });
  }
};
