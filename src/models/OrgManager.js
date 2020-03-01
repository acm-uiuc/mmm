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

export default mongoose.models.OrgManager ||
  mongoose.model('OrgManager', OrgManagerSchema);
