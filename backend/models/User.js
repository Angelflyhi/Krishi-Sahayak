const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    is_expert: { type: Boolean, default: false },
    language: { type: String, enum: ['en', 'hi', 'mr'], default: 'en' },
    community_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
