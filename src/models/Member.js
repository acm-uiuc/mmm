import mongoose from 'mongoose';

import Topic from 'models/Topic';

const MemberSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    index: true,
    unique: true
  },
  interests: {
    required: true,
    type: [
      {
        _id: {
          required: true,
          type: String,
          ref: Topic
        },
        weight: {
          required: true,
          type: Number
        }
      }
    ]
  },
  current: {
    required: true,
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
