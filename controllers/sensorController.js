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
