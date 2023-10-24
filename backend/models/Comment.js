const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CommentSchema = new mongoose.Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    blogpostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Blogpost',
    },
    comment: {
      type: String,
      required: [true, ' Please add a  comment'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting more than 1 comment per Blogpost
// CommentSchema.index({ blogpostId: 1, commenter: 1 }, { unique: true });

module.exports = mongoose.model('Comment', CommentSchema);
