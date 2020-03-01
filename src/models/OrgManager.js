import mongoose from 'mongoose';

const OrgManagerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  org: {
    type: String,
    ref: 'Org',
    required: true,
    index: true
  }
});

// TODO[Bailey]: Multi-key index

export default mongoose.models.OrgManager ||
  mongoose.model('OrgManager', OrgManagerSchema);
