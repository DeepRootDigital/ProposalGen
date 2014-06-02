var mongoose = require('mongoose'),
ProposalPage = mongoose.model('Proposalpage');
/*
 * GET memes listing.
 */

 exports.list = function(req, res, next) {
  ProposalPage.find({},{ _id: false },function(err,proposals){
    if (err) return next(err);
    if (!proposals) return next("empty");
    res.status(200).send(proposals);
  });
};

/*
 * POST to addmeme
 */

exports.add = function(req, res, next) {
  ProposalPage.findOneAndUpdate({"typename":req.body.typename},req.body,{upsert:true},function(err,proposal){
    if (err) {
      res.status(400).send('There was an error.');
      return;
    }
    res.status(200).send('Success!');
  });
};

/*
 * DELETE to deletememe
 */

 exports.deletememe = function(db) {
   return function(req, res) {
     var memeToDelete = req.body.id;
     db.collection('memelist').removeById(memeToDelete, function(err, result) {
       res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
     });
   }
 };