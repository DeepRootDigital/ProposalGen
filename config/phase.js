var fs = require('fs');
var mongoose = require('mongoose'),
Phase = mongoose.model('Phases');

/*
 * GET Phase Listing.
 */

 exports.list = function(req, res, next) {
  Phase.find({},function(err,phases){
    if (err) return next(err);
    if (!phases) return next("empty");
    res.status(200).send(phases);
  });
};

/*
 * GET Phase Single
 */
exports.get = function(req, res, next) {
  Phase.find({_id: req.body.pid},{_id:false}).exec(function(err,phase){
    if (err) return next(err);
    if (!phase) return next("empty");
    res.status(200).send(phase);
  });
};

/*
 * POST to Save Phase or make a new one
 */

exports.save = function(req, res, next) {
  Phase.findOneAndUpdate({phase_name:req.body.phase_name},req.body,{upsert:true},function(err,phase){
    if (err) {
      res.status(400).send('There was an error.');
      return;
    }
    res.status(200).send('Success!');
  });
};