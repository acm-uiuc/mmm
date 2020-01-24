import mongoose from 'mongoose';
import {ObjectId} from 'mongoose/Schema/Types';
import Topic from 'models/Topic.js';

const EventSchema = new mongoose.Schema({
  org: {
    required: true,
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['sig', 'committee', 'company', 'other'],
      default: 'sig',
      required: true
    }
  },
  creator: {
    type: String,
    required: true
  },
  eventDate: {
    startTime: Date,
    endTime: Date
  },
  topics: {
    type: [ObjectId],
    ref: Topic
  }
});

/** Changes the password of the (local copy of) user model.
 *
 * @param {String} password The plain text password.
 */
EventSchema.methods.sample1 = async function() {};

EventSchema.statics.sample2 = async function() {};

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
