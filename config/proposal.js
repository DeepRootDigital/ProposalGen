var PDFDocument = require('pdfkit');
var fs = require('fs');
var mongoose = require('mongoose'),
Proposal = mongoose.model('Proposal');
/*
 * GET memes listing.
 */

 exports.list = function(req, res, next) {
  Proposal.find({owner: req.user.email},{proposalname: true, _id:true},function(err,proposals){
    if (err) return next(err);
    if (!proposals) return next("empty");
    res.status(200).send(proposals);
  });
};

/*
 * POST to addmeme
 */

 exports.load = function(req, res, next) {
  Proposal.find({_id: req.body.chosen, owner: req.user.email }).exec(function(err,proposal){
    if (err) return next(err);
    if (!proposal) return next("empty");
    res.status(200).send(proposal);
  });
};

exports.genproposal = function() {
  return function(req,res) {
    var pageSize = {
      width: 1294,
      height: 999
    };
    var count = 0;
    var doc = new PDFDocument({layout:'landscape',margin: 0,size:[1003.00, 1298.00]});
    var stream = doc.pipe(fs.createWriteStream('public/pdf/' + req.body.clientname + '.pdf'));
    // Iterate through the pages
    req.body.pages.forEach(function(page){
      if (count != 0) {
        doc.addPage();
      }
      count += 1;
      // Check Settings for Background
      if (page.background.image == false) {
        doc.rect(0,0,pageSize.width,pageSize.height).fillAndStroke("red");
      } else {
        // doc.image(page.background.source, 0, 0, {width: pageSize.width, height: pageSize.height});
      }
      //Check Settings for Header
      if (page.pagesetup.header.exists == true) {
        if (page.pagesetup.header.settings.image == false) {
          doc.rect(0,0,pageSize.width,(page.pagesetup.header.settings.height/100)*pageSize.height).fillAndStroke("blue");
        } else {
          // doc.image(page.pagesetup.header.settings.source, 0, 0, {width: pageSize.width, height: (page.pagesetup.header.settings.height/100)*pageSize.height});
        }
      }
      //Check Settings for Footer
      if (page.pagesetup.footer.exists == true) {
        if (page.pagesetup.header.settings.image == false) {
          doc.rect(0,pageSize.height-((page.pagesetup.footer.settings.height/100)*pageSize.height),pageSize.width,(page.pagesetup.footer.settings.height/100)*pageSize.height).fillAndStroke(page.pagesetup.footer.settings.color);
        } else {
          // doc.image(page.pagesetup.header.settings.source, 0, pageSize.height-((page.pagesetup.footer.settings.height/100)*pageSize.height), {width: pageSize.width, height: (page.pagesetup.footer.settings.height/100)*pageSize.height});
        }
      }
      //Iterate through Headings
      page.pagesetup.heading.forEach(function(heading){
        if (heading.exists == true) {
          doc.fontSize(heading.settings.size).fillColor('#2c292a').font(heading.settings.font).text(heading.content ? heading.content : "", (heading.settings.xpos/100) * pageSize.width, (heading.settings.ypos/100) * pageSize.height, {width:(heading.settings.width/100)*pageSize.width});
        }
      });
      //Iterate through Textbodies
      page.pagesetup.textbody.forEach(function(textbody){
        if (textbody.exists == true) {
          doc.fontSize(textbody.settings.size).fillColor('#2c292a').font(textbody.settings.font).text(textbody.content ? textbody.content : "", (textbody.settings.xpos/100) * pageSize.width, (textbody.settings.ypos/100) * pageSize.height, {width:(textbody.settings.width/100)*pageSize.width});
        }
      });
      //Iterate through Imageareas
      page.pagesetup.imagearea.forEach(function(imagearea){
        if (imagearea.exists == true) {
          // doc.image(imagearea.content ? imagearea.content : imagearea.settings.defaultimage, (imagearea.settings.xpos/100) * pageSize.width, (imagearea.settings.ypos/100) * pageSize.height, {width: (imagearea.settings.width/100)*pageSize.width, height: (imagearea.settings.height/100)*pageSize.height});
        }
      });
      page.pagesetup.etc.forEach(function(etc){
        if (etc.exists == true) {
          if (etc.assettype == "box") {
            doc.rect((etc.settings.xpos/100)*pageSize.width,(etc.settings.ypos/100)*pageSize.height,(etc.settings.width/100)*pageSize.width,(etc.settings.height/100)*pageSize.height).fillAndStroke("green");
          } else if (etc.assettype == "table") {

          }
        }
      })
    });
    doc.end();
    stream.on('finish', function() {
      res.send(200);
    });
  }
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