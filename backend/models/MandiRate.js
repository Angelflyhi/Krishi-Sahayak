const mongoose = require('mongoose');

const mandiRateSchema = new mongoose.Schema(
  {
    district: { type: String, required: true, trim: true, index: true },
    crop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
    price: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MandiRate', mandiRateSchema);
