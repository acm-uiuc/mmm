import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  name: {
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

/** Filters out server metadata from the topic object.
 * 
 * @return {Object} Topic
*/
TopicSchema.methods.getReturnableTopic = function() {
  console.log(this);
  console.log(this.name);
  return {
    name: this.name,
    kind: this.kind
  };
};

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
