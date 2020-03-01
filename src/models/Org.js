import mongoose from 'mongoose';
import OrgManager from 'models/OrgManager';

const OrgSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    enum: ['general', 'sig', 'committee', 'company', 'other'],
    default: 'sig',
    index: true,
    required: true
  }
});

/** Filters out server metadata from the org object.
 *
 * @return {Object} Org
 */
OrgSchema.methods.getReturnableOrg = function() {
  return {
    _id: this._id,
    name: this.name,
    kind: this.kind
  };
};

/**
 * Determines whether the specified user is authorized to manipulate the org's events.
 * @param {String} email the user's email address
 * @return {Boolean} whether the user is authorized
 */
OrgSchema.methods.isUserAuthorized = async function(email) {
  const size = await OrgManager.find({ email: email, org: this._id }).count();
  return size > 0;
};

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
