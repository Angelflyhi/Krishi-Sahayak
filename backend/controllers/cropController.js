const Crop = require('../models/Crop');

exports.getCrops = async (req, res, next) => {
  try {
    const { search, season, soil } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (season) {
      query.seasonality = season;
    }
    if (soil) {
      query.soil_type = soil;
    }

    const crops = await Crop.find(query).sort({ name: 1 });
    res.json(crops);
  } catch (error) {
    next(error);
  }
};

exports.getCropById = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    return res.json(crop);
  } catch (error) {
    return next(error);
  }
};

exports.createCrop = async (req, res, next) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (error) {
    next(error);
  }
};
