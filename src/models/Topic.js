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
    enum: ['language', 'domain', 'other']
  }
});

/** Changes the password of the (local copy of) user model.
 *
 * @param {String} password The plain text password.
 */
EventSchema.methods.sample1 = async function() {};

EventSchema.statics.sample2 = async function() {};

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
