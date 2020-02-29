import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    index: true,
    unique: true
  },
  type: {
    type: String,
    index: true,
    enum: ['language', 'domain', 'social', 'other']
  }
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
