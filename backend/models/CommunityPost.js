const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    crop_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop' },
    content: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CommunityPost', communityPostSchema);
