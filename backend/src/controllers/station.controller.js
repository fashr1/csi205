const Station = require('../models/Station');

exports.getAllStations = async (req, res) => {
  try {
    const { status } = req.query;
    const filters = status ? { status } : {};
    const stations = await Station.getAll(filters);
    res.json({ stations });
  } catch (error) {
    console.error('Get stations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await Station.findById(id);
    
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    
    res.json({ station });
  } catch (error) {
    console.error('Get station error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
