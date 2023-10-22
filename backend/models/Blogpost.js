const mongoose = require('mongoose');

const BlogpostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, ' Blogpost title is required'],
      unique: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, ' Blogpost content is required'],
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blogpost', BlogpostSchema);
