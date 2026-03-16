const MandiRate = require('../models/MandiRate');

exports.getMandiRates = async (req, res, next) => {
  try {
    const { district, crop } = req.query;
    const query = {};

    if (district) {
      query.district = district;
    }
    if (crop) {
      query.crop_id = crop;
    }

    const rates = await MandiRate.find(query).populate('crop_id', 'name').sort({ date: -1 });
    res.json(rates);
  } catch (error) {
    next(error);
  }
};
