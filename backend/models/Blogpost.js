const mongoose = require('mongoose');

const BlogpostSchema = new mongoose.Schema(
  {
    author: {
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
        'Sample Category',
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete comments when a blogpost is deleted
// BlogpostSchema.pre('remove', async function (next) {
//   await this.model('Comment').deleteMany({ blogpostId: this._id });
//   next();
// });

// Reverse populate with virtuals
BlogpostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blogpostId',
  justOne: false,
});

module.exports = mongoose.model('Blogpost', BlogpostSchema);
