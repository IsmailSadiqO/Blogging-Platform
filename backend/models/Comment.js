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
    // commenterFirstName: {
    //   //   type: mongoose.Schema.Types.String,
    //   type: String,
    //   required: true,
    //   //   ref: 'User',
    // },
    // commenterLastName: {
    //   //   type: mongoose.Schema.Types.String,
    //   type: String,
    //   required: true,
    //   //   ref: 'User',
    // },
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

module.exports = mongoose.model('Comment', CommentSchema);
