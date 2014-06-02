var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ProposalSchema = new Schema({
  owner: String,
  proposalname: String,
  propinfo: {}
});

module.exports = mongoose.model('Proposal', ProposalSchema);