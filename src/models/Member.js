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
    ],
    default: []
  },
  current: {
    required: true,
    type: Boolean,
    default: true
  }
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
