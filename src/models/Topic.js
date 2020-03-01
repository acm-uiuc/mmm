import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  _id: {
    type: String,
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
  return {
    _id: this._id,
    kind: this.kind
  };
};

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
