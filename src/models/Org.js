import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  _id: { // name
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  type: {
    type: String,
    enum: ['sig', 'committee', 'company', 'other'],
    default: 'sig',
    index: true,
    required: true
  }
});

/** Changes the password of the (local copy of) user model.
 *
 * @param {String} password The plain text password.
 */
OrgSchema.methods.sample1 = async function() {};

OrgSchema.statics.sample2 = async function() {};

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
