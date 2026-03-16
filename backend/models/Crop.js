const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    seasonality: { type: String, required: true, trim: true },
    soil_type: { type: String, required: true, trim: true, index: true },
    irrigation_needs: { type: String, required: true, trim: true },
    fertilizers: [{ type: String, trim: true }],
    pests: [
      {
        name: { type: String, trim: true },
        treatment: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
