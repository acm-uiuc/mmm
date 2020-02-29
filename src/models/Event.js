import mongoose from 'mongoose';
import Topic from 'models/Topic.js';
import Org from 'models/Org.js';

const EventSchema = new mongoose.Schema({
  org: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Org
  },
  creator: {
    type: String,
    required: true,
    index: true
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
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Topic
  }]
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
