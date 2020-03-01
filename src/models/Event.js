import mongoose from 'mongoose';
import Topic from 'models/Topic.js';
import Org from 'models/Org.js';

const EventSchema = new mongoose.Schema({
  org: {
    type: String,
    required: true,
    ref: Org
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: String,
    required: true,
    index: true
  },
  eventDate: {
    startTime: { type: Date },
    endTime: { type: Date }
  },
  name: {
    required: true,
    type: String
  },
  topics: [
    {
      type: String,
      ref: Topic
    }
  ]
});

/** Filters out server metadata from the Event object.
 *
 * @return {Object} Event
 */
EventSchema.methods.getReturnableEvent = async function() {
  const event = await this.populate('org')
    .populate('topics')
    .execPopulate();
  return {
    name: event.name,
    org: event.org.getReturnableOrg(),
    description: event.description,
    creator: event.creator,
    eventDate: event.eventDate,
    topics: event.topics.map((t) => t.getReturnableTopic())
  };
};

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
