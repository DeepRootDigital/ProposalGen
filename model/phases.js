var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PhasesSchema = new Schema({
  phase_name: String,
  phase_content: String,
  phase_cost: String,
  phase_shortname: String,
  phase_department: String,
  phase_type: String
});

module.exports = mongoose.model('Phases', PhasesSchema);