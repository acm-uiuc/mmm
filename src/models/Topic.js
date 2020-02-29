import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  kind: {
    type: String,
    index: true,
    enum: ['language', 'domain', 'social', 'other'],
    required: true
  }
});

/** Filters out server metadata from the topic object.*/
EventSchema.methods.getReturnableTopic = async function() {
  return {
    topic: this.topic,
    kind: this.kind
  }
};

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
