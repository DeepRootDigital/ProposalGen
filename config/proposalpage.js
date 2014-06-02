var mongoose = require('mongoose'),
ProposalPage = mongoose.model('Proposalpage');
/*
 * GET memes listing.
 */

 exports.list = function(req, res, next) {
  ProposalPage.find({},'proposalname',function(err,proposals){
    if (err) return next(err);
    if (!proposals) return next("empty");
    res.status(200).send(proposals);
  });
};

/*
 * POST to addmeme
 */

 exports.load = function(req, res, next) {
  ProposalPage.find({proposalname: req.body.chosen}).exec(function(err,proposal){
    if (err) return next(err);
    if (!proposal) return next("empty");
    res.status(200).send(proposal);
  });
};

exports.addProposal = function(req, res, next) {
  Proposal.findOneAndUpdate({proposalname:req.body.proposalname},req.body,{upsert:true},function(err,proposal){
    if (err) {
      res.status(400).send('There was an error.');
      return;
    }
    res.status(200).send('Success!');
  });
};

exports.updateMeme = function(db) {
  return function(req, res) {
    var usern = req.body.username;
    var mmn = req.body.memename;
    db.collection('memelist').update({"username" : usern, "memename" : mmn }, req.body, function(err, result){
      res.send(
        (err === null) ? { msg: ''} : { msg: err }
        );
    });
  }
}

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