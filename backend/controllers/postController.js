const CommunityPost = require('../models/CommunityPost');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await CommunityPost.find()
      .populate('user_id', 'username is_expert')
      .populate('crop_id', 'name')
      .sort({ created_at: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await CommunityPost.create({
      user_id: req.user.id,
      crop_id: req.body.crop_id,
      content: req.body.content,
    });

    const populatedPost = await post.populate('user_id', 'username is_expert');
    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};
