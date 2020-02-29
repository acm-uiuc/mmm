import mongoose from 'mongoose';
import Topic from 'models/Topic.js';
import Org from 'models/Org.js';

const EventSchema = new mongoose.Schema({
  org: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Org
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: String,
    required: true
  },
  eventDate: {
    startTime: Date,
    endTime: Date
  },
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  topics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Topic
  }
});

/** Filters out server metadata from the event object.*/
EventSchema.methods.getReturnableEvent = async function() {
  return {
    name: this.name,
    org: this.org,
    description: this.description,
    creator: this.creator,
    eventDate: this.eventDate,
    topics: this.topics // TODO[Bailey]: aggregate these
  }
};

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
