const mongoose = require('mongoose');

const BlogpostSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: false,
      enum: [
        'Web Development',
        'Mobile Development',
        'Backend Development',
        'UI/UX',
        'Data Science',
        'Systems Programming',
        'Other',
      ],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blogpost', BlogpostSchema);
