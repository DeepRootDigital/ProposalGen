var PDFDocument = require('pdfkit');
var fs = require('fs');
var mongoose = require('mongoose'),
Proposal = mongoose.model('Proposal');
/*
 * GET Proposal listing.
 */

 exports.list = function(req, res, next) {
  Proposal.find({},{proposalname: true, _id:true},function(err,proposals){
    if (err) return next(err);
    if (!proposals) return next("empty");
    res.status(200).send(proposals);
  });
};

/*
 * POST to addmeme
 */

 exports.get = function(req, res, next) {
  Proposal.find({_id: req.body.pid},{_id:false}).exec(function(err,proposal){
    if (err) return next(err);
    if (!proposal) return next("empty");
    res.status(200).send(proposal);
  });
};

exports.generate = function(req, res, next) {
  var pageSize = {
    width: 595.28,
    height: 841.89
  };
  var data = req.body;
  var doc = new PDFDocument({layout:'portrait',margin: 0,size:[595.28, 841.89]});
  var stream = doc.pipe(fs.createWriteStream('public/pdf/' + req.body.proposalname + '.pdf'));

  var topArea = 296 + 27 * data.propinfo.length;
  var pageBottom = pageSize - 30;

  doc.rect(0,0,pageSize.width,topArea).fillAndStroke("#f2f2f2");
  
  var leftContainer = (pageSize.width * .88) * .25;
  var rightContainer = (pageSize.width * .88) * .75;
  var rightContainerDiv = rightContainer / 12;
  var leftMargin = .06 * pageSize.width;

  doc.fontSize(30).fillColor('#7e1619').text("// ", leftMargin, 30).fillColor('#343533').text(req.body.proposalname.toUpperCase(), leftMargin + 23, 30)
  .image("public/images/logo-red.png", .94 * pageSize.width - 55, 30, {width: 55})
  .fontSize(12).text("PHASE", leftMargin, 110,{width: leftContainer, align: "center"})
  .text("MONTH", leftMargin + leftContainer, 110, {width: rightContainer, align: "center"});

  // Iterate out the months
  for (var i = 0; i < 12; i++) {
    doc.text(i+1, leftMargin + leftContainer + (rightContainerDiv * i), 125, {width: rightContainerDiv, align: "center"});
  }


  // Iterate over the phases
  for (var i = 0; i < data.propinfo.length; i++) {
    var thisData = data.propinfo[i];
    var top = 140 + (i * 27);
    // Place Name on the Left
    doc.fillColor("#343533").text(thisData.phase_shortname, leftMargin, top+5, {width: leftContainer, align: "left"});
    // Iterate over the gantt boxes
    for (var j = 0; j < thisData.gantt.length; j++) {
      var left = leftMargin + leftContainer + (j * rightContainerDiv);
      // Check if the box should be filled
      if (thisData.gantt[j].show == true) {
        // Determine the fill color
        if (thisData.phase_department == "Research") {
          var fillingColor = "#F1AF00";
        } else if (thisData.phase_department == "Marketing") {
          var fillingColor = "#E11A22";
        } else if (thisData.phase_department == "Branding") {
          var fillingColor = "#6EC5E1";
        } else {
          var fillingColor = "#B3D807";
        }
        // Fill the box according to the department
        doc.dash(1,{space:0}).rect(left,top,rightContainerDiv,25).fillAndStroke(fillingColor,fillingColor);
      }
      // Place the dotted lines to separate the boxes
      doc.moveTo(left,top).lineTo(left,top+25).dash(1,{space:2}).strokeColor("#343533").stroke().moveTo(left+rightContainerDiv,top).lineTo(left+rightContainerDiv,top+25).stroke();
    }
  }

  // Write the Optional Services Line
  doc.fillColor("#343533").text("*Optional services that can help to further increase website conversion rates.", leftMargin, top + 35, {width: .88 * pageSize.width, align: "left"});

  // Place different department logos and title
  var departmentWidth = .22 * pageSize.width;
  doc.image("public/images/servicepage-planning.png", leftMargin + ((departmentWidth - 50) / 2), top + 75, {width: 50})
  .fillColor("#343533").text("RESEARCH", leftMargin, top + 135, {width: .22 * pageSize.width, align: "center", continued: "yes"}).text("& PLANNING")
  doc.image("public/images/servicepage-marketing.png", leftMargin + ((departmentWidth - 50) / 2) + departmentWidth, top + 75, {width: 50})
  .fillColor("#343533").text("MARKETING", leftMargin + departmentWidth, top + 135, {width: .22 * pageSize.width, align: "center"})
  doc.image("public/images/servicepage-branding.png", leftMargin + ((departmentWidth - 50) / 2) + departmentWidth * 2, top + 75, {width: 50})
  .fillColor("#343533").text("BRANDING", leftMargin + departmentWidth * 2, top + 135, {width: .22 * pageSize.width, align: "center"})
  doc.image("public/images/servicepage-webdev.png", leftMargin + ((departmentWidth - 50) / 2) + departmentWidth * 3, top + 75, {width: 50})
  .fillColor("#343533").text("TECH", leftMargin + departmentWidth * 3, top + 135, {width: .22 * pageSize.width, align: "center"});

  // Bottom Portion of PDF
  topArea += 30;
  for (var i = 0; i < data.propinfo.length; i++) {
    var thisData = data.propinfo[i];
    doc.fillColor("#f2f2f2").text(thisData.phase_type + " - ",leftMargin,topArea, {continued: true, width: .88 * pageSize.width, columns: 2})
    .fillColor("#343533").text(thisData.phase_name + " " + thisData.phase_cost)
    .text("<ul><li><b>Section 1 -</b> Industry Performance</li><li><b>Section 2 -</b> Company Overview</li></ul>");
  }

  

  // End and Save PDF
  doc.end();
  stream.on('finish', function() {
    res.send(200);
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

/*exports.updateMeme = function(db) {
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
 *

 exports.deletememe = function(db) {
   return function(req, res) {
     var memeToDelete = req.body.id;
     db.collection('memelist').removeById(memeToDelete, function(err, result) {
       res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
     });
   }
 };*/