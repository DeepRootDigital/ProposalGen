var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ProposalSchema = new Schema({
  typename: String,
  typeowner: String,
  background: {
    image: Boolean,
    color: String,
    source: String
  },
  pagesetup: {
    header: {
      exists: Boolean,
      settings: {
        image: Boolean,
        color: String,
        source: String,
        height: Number
      }
    },
    footer: {
      exists: Boolean,
      settings: {
        image: Boolean,
        color: String,
        source: String,
        height: Number
      }
    },
    heading: Array,
    textbody: Array,
    imagearea: Array,
    etc: Array
  }
});

module.exports = mongoose.model('Proposalpage', ProposalSchema);