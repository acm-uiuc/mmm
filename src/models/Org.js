import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  _id: { // name
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'sig', 'committee', 'company', 'other'],
    default: 'sig',
    index: true,
    required: true
  }
});

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
