import mongoose from 'mongoose';
import Topic from 'models/Topic.js';
import Org from 'models/Org.js';
import OrgManager from 'models/OrgManager.js';

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
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  },
  name: {
    required: true,
    type: String
  },
  location: {
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
    _id: event._id,
    name: event.name,
    org: event.org.getReturnableOrg(),
    description: event.description,
    creator: event.creator,
    eventDate: event.eventDate,
    location: event.location,
    topics: event.topics.map((t) => t.getReturnableTopic())
  };
};

/**
 * Determines whether the specified user is authorized to manipulate this event.
 * @param {String} email the user's email
 * @return {Boolean} whether the user is authorized
 */
EventSchema.methods.isUserAuthorized = async function(email) {
  const size = await OrgManager.find({ email: email, org: this.org }).count();
  return size > 0;
};

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
