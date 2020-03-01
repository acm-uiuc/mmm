import mongoose from 'mongoose';

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
        name: {
          required: true,
          type: String
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
    type: Boolean
  }
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
