var PDFDocument = require('pdfkit');
var fs = require('fs');
/*
 * GET memes listing.
 */

 exports.list = function(db) {
  return function(req, res) {
  	db.collection('proposallist').find().toArray(function(err, items) {
      res.json(items);
    });
  }
};

/*
 * POST to addmeme
 */

 exports.genproposal = function() {
  return function(req,res) {
    var doc = new PDFDocument({layout:'landscape',margin: 0});
    var stream = doc.pipe(fs.createWriteStream('public/pdf/' + req.body.clientname + '.pdf'));
    // Page: Cover
    mainmenu(doc);
    doc.image("public/images/cover-img.png",50, 190, {width:692});
    doc.registerFont('DinLight','public/fonts/DINPro-Light.ttf')
    .registerFont('DinMedium','public/fonts/DINPro-Medium.ttf');
    for (var i=0;i<req.body.pages.length;i++) {
      if (req.body.pages[i].pagetype == "coverpage") {

      } else if (req.body.pages[i].pagetype == "sectiontwocover") {
        // Page: Client Overview
        doc.addPage();
        mainmenu(doc);
        if (req.body.pages[i].pageimage) {
          var pageimagetwo = req.body.pages[i].pageimage;
        } else {
          var pageimagetwo = "q2f-image.png";
        }
        doc.rect(0,111,790,499)
        .fillAndStroke(req.body.pages[i].pagetitle,req.body.pages[i].pagetitle)
        .image("public/images/section-two-moniker-dark.png",50,190,{width:132})
        .fillColor("#2c292a").fontSize(50)
        .font('DinLight')
        .text(req.body.clientname.toUpperCase(), 200, 195, {underline:true});
        if (Math.floor(req.body.pages[i].pagetext) == 192) {
          doc.image("public/icons/"+pageimagetwo, Math.floor(req.body.pages[i].pagetext), 285, {width:492});
        } else {
          doc.image("public/icons/"+pageimagetwo, Math.floor(req.body.pages[i].pagetext), 285);
        }
      } else if (req.body.pages[i].pagetype == "sectionthreecover") {
        // Page: Product & Service Offerings
        doc.addPage();
        mainmenu(doc);
        doc.image("public/images/section-three-moniker-dark.png",50,190)
        .fontSize(30).fillColor('#7e1417').font('DinLight').font('DinMedium').text("PRODUCT ", 200, 195, {width:400,lineGap:-10,continued:true})
        .fillColor('#2c292a').font('DinLight').text("& SERVICE OFFERINGS",{lineGap:-10})
        .moveTo(200,265).lineTo(500,265).stroke("#2c292a")
        .image("public/images/big-bms-logo.png",266,297)
      } else if (req.body.pages[i].pagetype == "subwaypage") {
        // Page: Subway
        doc.addPage();
        mainmenu(doc);
        if (req.body.pages[i].pageimage) {
          var pageimagesub = req.body.pages[i].pageimage;
        } else {
          var pageimagesub = "Subway_Map_CISCO.png";
        }
        doc.image("public/images/square-texture.png",0,111)
        .image("public/icons/"+pageimagesub,125,190,{width:542});
      } else if (req.body.pages[i].pagetype == "tablepage") {
        // Sixth Page: Service Offering Table
        serviceTable(doc,req.body.pages[i].pagetext,req.body.pages[i].pagesub);
      } else if (req.body.pages[i].pagetype == "thedisciplines") {
        theDisciplines(doc);
      } else if (req.body.pages[i].pagetype == "worksamples") {
        workSamples(doc);
      } else if (req.body.pages[i].pagetype == "theteam") {
        theTeam(doc);
      } else if (req.body.pages[i].pagetype == "backcoverpage") {
        // Back Cover
        doc.addPage();
        mainmenu(doc);
        doc.image("public/images/BMS_contact.png",325,140,{width:156});
      } else if (req.body.pages[i].pagetype == "titletext") {
        titleText(doc,req.body.pages[i].pagetitle,req.body.pages[i].pagetext);
      } else if (req.body.pages[i].pagetype == "titletextsublist") {
        titleTextSubList(doc,req.body.pages[i].pagetitle,req.body.pages[i].pagetext,req.body.pages[i].pagesub,req.body.pages[i].pagelist);
      } else if (req.body.pages[i].pagetype == "titlesubtext") {
        titleSubText(doc,req.body.pages[i].pagetitle,req.body.pages[i].pagesub,req.body.pages[i].pagetext);
      } else if (req.body.pages[i].pagetype == "iconstitlesubtext") {
        iconsTitleSubText(doc,req.body.pages[i].pageicons,req.body.pages[i].pagetitle,req.body.pages[i].pagesub,req.body.pages[i].pagetext);
      } else if (req.body.pages[i].pagetype == "iconstitlesubtextlist") {
        iconsTitleSubTextList(doc,req.body.pages[i].pageicons,req.body.pages[i].pagetitle,req.body.pages[i].pagesub,req.body.pages[i].pagetext,req.body.pages[i].pagelist);
      } else {
      }
    }
    doc.end();
    stream.on('finish', function() {
      res.send(200);
    });
  }
};

exports.addproposal = function(db) {
 return function(req, res) {
   db.collection('proposallist').insert(req.body, function(err, result){
     res.send(
       (err === null) ? { msg: ''} : { msg: err }
       );
   });
 }
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


 function mainmenu(doc) {
  doc.registerFont('DinLight','public/fonts/DINPro-Light.ttf');
  doc.image('public/images/header-texture.jpg', 0, 0)
  .image('public/images/logo.png', 60, 25)
  .moveTo(145,0).lineTo(145,95).moveTo(265,0).lineTo(265,95)
  .moveTo(385,0).lineTo(385,95).moveTo(505,0).lineTo(505,95)
  .moveTo(625,0).lineTo(625,95).lineWidth(1).stroke("#fff")
  .fontSize(12).fillColor("#fff").font('DinLight')
  .text("01.", 160, 28).text("YOUR GO TO MARKET TEAM", 160, 45, {width: 95})
  .text("02.", 280, 28).text("CLIENT OVERVIEW", 280, 45, {width: 95})
  .text("03.", 400, 28).text("PRODUCTS & SERVICE OFFERINGS", 400, 45, {width: 95})
  .text("04.", 520, 28).text("WORK SAMPLES", 520, 45, {width: 95})
  .text("05.", 640, 28).text("GET TO KNOW YOUR TEAM", 640, 45, {width: 95});
}

function serviceTable(doc,tableinfo,discount) {
  var contentLength = 0;
  doc.addPage();
  mainmenu(doc);
  doc.moveTo(125,190)
  .lineTo(667,190)
  .stroke("#2c292a")
  .fontSize(30)
  .fillColor('#2c292a').font('DinLight')
  .text("SERVICE ", 125, 210, {width:460, continued:true})
  .fillColor('#7e1417').font('DinMedium')
  .text("OFFERING");
  doc.fontSize(22)
  .fillColor('#7e1417')
  .text("SERVICE", 125, 260)
  .text("TIMEFRAME", 395, 260)
  .text("SUBTOTAL", 545, 260, {width:122,align:'right'});
  var priceSubTotal = 0;
  for (var i=0;i<tableinfo.length;i++) {
    contentLength += (tableinfo[i].pservice.length + 1)
    if (contentLength > 14) {
      doc.addPage();
      mainmenu(doc);
      doc.moveTo(125,190)
      .lineTo(667,190)
      .stroke("#2c292a")
      .fontSize(30)
      .fillColor('#2c292a').font('DinLight')
      .text("SERVICE ", 125, 210, {width:460, continued:true})
      .fillColor('#7e1417').font('DinMedium')
      .text("OFFERING");
      doc.fontSize(22)
      .fillColor('#7e1417')
      .text("SERVICE", 125, 260)
      .text("TIMEFRAME", 395, 260)
      .text("SUBTOTAL", 545, 260, {width:122,align:'right'});
      contentLength = tableinfo[i].pservice.length + 1;
    }
    var startPos = 21 * (contentLength - tableinfo[i].pservice.length - 1) + 295;
    var midPos = 21 * (contentLength - Math.floor((tableinfo[i].pservice.length + 2)*(1/2))) + 295;
    doc.fontSize(14).fillColor('#2c292a').font('DinLight')
      .text(tableinfo[i].ptime, 395, midPos)
      .text(tableinfo[i].psub, 545, midPos, {width:122,align:'right'})
      .text(tableinfo[i].pname, 135, startPos);
    for (var j=0;j<tableinfo[i].pservice.length;j++) {
      doc.moveDown(0.25).text("»   "+tableinfo[i].pservice[j], {indent:20});
    }
    priceSubTotal += parseInt(tableinfo[i].psub.slice(1).replace(',',''));
  }
  grandTotal = priceSubTotal - discount;
  doc.fontSize(14).fillColor('#7e1417').font('DinMedium').text('Total: ',545,21 * contentLength + 315,{continued:true})
  .fillColor('#2c292a').font('DinLight').text("$"+priceSubTotal)
  .fillColor('#7e1417').font('DinMedium').text('BMS Discount: ',{continued:true}).fillColor('#2c292a').font('DinLight').text("$"+discount)
  .fillColor('#7e1417').font('DinMedium').text('Grand Total: ',{continued:true}).fillColor('#2c292a').font('DinLight').text("$"+grandTotal);
}

function theDisciplines(doc) {
  // R&P Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#faa61a','#faa61a')
  .moveTo(150,150).lineTo(500,150).moveTo(150,185).lineTo(500,185).stroke('#2c292a')
  .fontSize(30).fillColor('#2c292a').font('DinLight')
  .text("RESEARCH & PLANNING", 155, 148)
  .image("public/images/rd-icon.png", 650, 130, {width:74})
  .moveTo(155, 262).lineTo(242, 262).moveTo(155, 428).lineTo(262, 428)
  .moveTo(440, 262).lineTo(705, 262).moveTo(440, 358).lineTo(601, 358)
  .stroke('#fff')
  .fontSize(15).strokeColor('#fff').font('DinLight')
  .text("PLANNING",155,242).moveDown(.5)
  .font('Helvetica').text("»  Due Dilligence Research",{width:235,indent:10})
  .text("»  *Feasibility Study",{width:235,indent:10})
  .text("»  *Business Plan Development",{width:235,indent:10})
  .text("»  *Marketing Plan Creation",{width:235,indent:10})
  .text("»  *Financial Modeling",{width:235,indent:10})
  .text("»  *Request for Proposal",{width:235,indent:10})
  .text("»  Distribution Plan",{width:235,indent:10})
  .moveDown(.9)
  .font('DinLight').text("CONSULTING").moveDown(.5)
  .font('Helvetica').text("»  Strategic Business Consulting",{width:235,indent:10})
  .text("»  *Investor Presentation Preperation",{width:295,indent:10})
  .font('DinLight').text("INVESTOR GRADE PRESENTATION",440,242).moveDown(.5)
  .font('Helvetica').text("»  *Powerpoint/Animated Presentation",{width:295,indent:10})
  .text("»  *Executive Summary",{width:235,indent:10})
  .text("»  CSS 3",{width:235,indent:10})
  .moveDown(.9)
  .font('DinLight').text("MARKET RESEARCH").moveDown(.5)
  .font('Helvetica').text("»  Target Demographic",{width:295,indent:10})
  .text("»  SWOT Analysis",{width:295,indent:10})
  .text("»  Feasibility Analysis",{width:295,indent:10})
  .text("»  Competition Analysis",{width:295,indent:10})
  .text("»  Product / Services",{width:295,indent:10})
  .text("»  Distribution Points",{width:295,indent:10})
  .text("»  Business Development",{width:295,indent:10})
  .moveDown(1)
  .text("*Branded / Non Branded",{width:295});
  // Branding Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#4dc6e1','#4dc6e1')
  .moveTo(150,150).lineTo(320,150).moveTo(150,185).lineTo(320,185).stroke('#2c292a')
  .fontSize(30).fillColor('#2c292a').font('DinLight')
  .text("BRANDING", 155, 148)
  .image("public/images/brand-icon.png", 650, 130)
  .moveTo(155, 262).lineTo(208, 262).moveTo(440, 262).lineTo(541, 262)
  .moveTo(155, 340).lineTo(297, 340)
  .moveTo(155, 418).lineTo(262, 418)
  .stroke('#fff')
  .fontSize(15).strokeColor('#fff')
  .text("LOGO",155,242).moveDown(.5)
  .font('Helvetica').text("»  Virtual ID",{width:295,indent:10})
  .text("»  Corporate ID",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("BRANDING GUIDE").moveDown(.5)
  .font('Helvetica').text("»  Typography",{width:295,indent:10})
  .text("»  Primary & Secondary Colors",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("STATIONARY").moveDown(.5)
  .font('Helvetica').text("»  Labels",{width:295,indent:10})
  .text("»  Letterhead",{width:295,indent:10})
  .text("»  Graphic Design",{width:295,indent:10})
  .font('DinLight').text("PACKAGING",440,242).moveDown(.5)
  .font('Helvetica').text("»  Labels",{width:295,indent:10})
  .text("»  3D Design",{width:235,indent:10})
  .text("»  Graphic Design",{width:235,indent:10});
  // WebDev Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#bed62f','#bed62f')
  .moveTo(150,150).lineTo(465,150)
  .moveTo(150,185).lineTo(465,185)
  .stroke('#2c292a')
  .fontSize(30).fillColor('#2c292a').font('DinLight')
  .text("WEB DEVELOPMENT", 155, 148)
  .image("public/images/wd-icon.png", 650, 130)
  .moveTo(155, 262).lineTo(335, 262).moveTo(400, 262).lineTo(600, 262)
  .moveTo(155, 358).lineTo(377, 358).moveTo(155, 436).lineTo(361, 436)
  .moveTo(400, 375).lineTo(620, 375).stroke('#fff')
  .fontSize(15).strokeColor('#fff')
  .text("ECOMMERCE WEBSITE",155,242).moveDown(.5)
  .font('Helvetica').text("»  Hybrid CMS",{width:235,indent:10})
  .text("»  Full Site",{width:235,indent:10})
  .text("»  3rd Party Integration",{width:235,indent:10})
  .moveDown(.8)
  .font('DinLight').text("LEAD GENERATION WEBSITE").moveDown(.5)
  .font('Helvetica').text("»  Landing Pages",{width:235,indent:10})
  .text("»  Full Site",{width:235,indent:10})
  .moveDown(.8)
  .font('DinLight').text("INFORMATIONAL WEBSITE").moveDown(.5)
  .font('Helvetica').text("»  Home",{width:235,indent:10})
  .text("»  About Us",{width:235,indent:10})
  .text("»  Services / Products",{width:235,indent:10})
  .text("»  Contact",{width:235,indent:10})
  .text("»  Blog",{width:235,indent:10})
  .font('DinLight').text("TECHNICAL CONSULTING",400,242).moveDown(.5)
  .font('Helvetica').text("»  Web Apps",{width:235,indent:10})
  .text("»  Mobile Apps",{width:235,indent:10})
  .text("»  Social Media",{width:235,indent:10})
  .text("»  Design",{width:235,indent:10})
  .moveDown(.8)
  .font('DinLight').text("FEASIBILITY & CONSULTING").moveDown(.5)
  .font('Helvetica').text("»  Architecture",{width:235,indent:10})
  .text("»  Discovery",{width:235,indent:10})
  .text("»  Due Diligence",{width:235,indent:10})
  .text("»  3rd Party Integration",{width:235,indent:10})
  .text("»  Database Migration",{width:235,indent:10})
  .text("»  Platform Scalability Solutions",{width:235,indent:10});
  // Marketing Page 1
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#ee2e24','#ee2e24')
  .moveTo(150,150).lineTo(340,150).moveTo(150,185).lineTo(340,185).stroke('#fff')
  .fontSize(30).fillColor('#fff').font('DinLight')
  .text("MARKETING", 155, 148)
  .image("public/images/mk-icon.png", 650, 130)
  .moveTo(155, 262).lineTo(196, 262).moveTo(450, 262).lineTo(649, 262)
  .moveTo(155, 358).lineTo(195, 358).moveTo(450, 427).lineTo(550, 427)
  .stroke('#fff')
  .fontSize(15)
  .fillColor('#fff')
  .text("SEM",155,242).moveDown(.5)
  .font('Helvetica').text("»  PPC",{width:295,indent:10})
  .text("»  Display",{width:295,indent:10})
  .text("»  Retargeting",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("SEO").moveDown(.5)
  .font('Helvetica').text("»  Public Relations",{width:295,indent:10})
  .text("»  Content Syndication",{width:295,indent:10})
  .text("»  Outreach",{width:295,indent:10})
  .text("»  Backlinking",{width:295,indent:10})
  .text("»  Business Development",{width:315,indent:10})
  .text("»  Partnership, Affiliates",{width:295,indent:10})
  .text("»  Split Testing",{width:295,indent:10})
  .text("»  Content Creation",{width:295,indent:10})
  .text("»  Webmastering, Analytics",{width:295,indent:10})
  .text("»  Content Management",{width:295,indent:10})
  .text("»  Technical SEO",{width:295,indent:10})
  .font('DinLight').text("TECHNICAL CONSULTING",450,242).moveDown(.5)
  .font('Helvetica').text("»  Web Apps",{width:295,indent:10})
  .text("»  Mobile Apps",{width:235,indent:10})
  .text("»  Feasibility Architecture",{width:235,indent:10})
  .text("»  Discovery",{width:235,indent:10})
  .text("»  Due Diligence",{width:295,indent:10})
  .text("»  Social Media",{width:295,indent:10})
  .text("»  Design, Infographics, Multimedia",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("PACKAGING").moveDown(.5)
  .font('Helvetica').text("»  Labels",{width:295,indent:10})
  .text("»  3D Design",{width:295,indent:10})
  .text("»  Graphic Design",{width:295,indent:10});
  // Marketing Page 2
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#ee2e24','#ee2e24')
  .moveTo(150,150).lineTo(340,150).moveTo(150,185).lineTo(340,185).stroke('#fff')
  .fontSize(30).fillColor('#fff').font('DinLight')
  .text("MARKETING", 155, 148)
  .image("public/images/mk-icon.png", 650, 130)
  .moveTo(155, 262).lineTo(210, 262).moveTo(450, 262).lineTo(564, 262)
  .moveTo(155, 376).lineTo(315, 376).moveTo(450, 376).lineTo(571, 376)
  .stroke('#fff')
  .fontSize(15).fillColor('#fff')
  .text("PRINT",155,242).moveDown(.5)
  .font('Helvetica').text("»  POP",{width:295,indent:10})
  .text("»  Marketing Fliers",{width:295,indent:10})
  .text("»  Postcards",{width:295,indent:10})
  .text("»  Brochures",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("MARKET RESEARCH").moveDown(.5)
  .font('Helvetica').text("»  Target Demographic",{width:295,indent:10})
  .text("»  SWAT Analysis",{width:295,indent:10})
  .text("»  Feasibility Analysis",{width:295,indent:10})
  .text("»  Product Services",{width:295,indent:10})
  .text("»  Competition Analysis",{width:315,indent:10})
  .text("»  Distribution Points",{width:295,indent:10})
  .text("»  Business Development",{width:295,indent:10})
  .font('DinLight').text("ON LOCATION",450,242).moveDown(.5)
  .font('Helvetica').text("»  Signage",{width:295,indent:10})
  .text("»  Fliers",{width:235,indent:10})
  .text("»  Booth Designs",{width:235,indent:10})
  .text("»  Trade Show Cards",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("DIGITAL MEDIA").moveDown(.5)
  .font('Helvetica').text("»  Radio",{width:295,indent:10})
  .text("»  TV",{width:295,indent:10})
  .text("»  Multimedia",{width:295,indent:10})
  .text("»  Videography",{width:295,indent:10})
  .text("»  Photography",{width:295,indent:10});
  // Business Development
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/sidebar.png", -145, 126)
  .rect(125,111,667,501)
  .fillAndStroke('#8d3b99','#8d3b99')
  .moveTo(150,150).lineTo(545,150).moveTo(150,185).lineTo(545,185).stroke('#fff')
  .fontSize(30).fillColor('#fff').font('DinLight')
  .text("BUSINESS DEVELOPMENT", 155, 148)
  .image("public/images/bd-icon.png", 650, 130)
  .moveTo(155, 262).lineTo(288, 262).moveTo(450, 262).lineTo(672, 262)
  .moveTo(155, 410).lineTo(265, 410).stroke('#fff')
  .fontSize(15)
  .fillColor('#fff')
  .text("SALES SUPPORT",155,242)
  .moveDown(.5)
  .font('Helvetica').text("»  Sales Team Development",{width:295,indent:10})
  .text("»  Phone Support",{width:295,indent:10})
  .text("»  Sales Pitch Creation",{width:295,indent:10})
  .text("»  Financial Modeling",{width:295,indent:10})
  .text("»  Request for Proposal",{width:295,indent:10})
  .text("»  Distribution Plan",{width:295,indent:10})
  .moveDown(.9)
  .font('DinLight').text("CONSULTING")
  .moveDown(.5)
  .font('Helvetica').text("»  Strategic Business Consulting",{width:295,indent:10})
  .text("»  Investor Presentation Preparation",{width:295,indent:10})
  .font('DinLight').text("NEW STREAMS OF REVENUE",450,242)
  .moveDown(.5)
  .font('Helvetica').text("»  Distribution",{width:295,indent:10})
  .text("»  Affiliates",{width:235,indent:10})
  .text("»  Partnerships",{width:235,indent:10});
}

function workSamples(doc) {
  doc.addPage();
  mainmenu(doc);
  doc.rect(0,111,800,501).fillAndStroke('#7e1417','#7e1417')
  .image("public/images/section-four-moniker-light.png",50,190)
  .fillColor("#fff").fontSize(50).font('DinLight').text("WORK", 200, 195)
  .font('DinMedium').text("SAMPLES", 200, 245)
  .moveTo(192,310).lineTo(457,310).stroke("#fff")
  .image("public/images/work-sample-cover.png",465,111,{width: 325});
  // Body Beanz Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/icons/BB1.png", 75, 157, {width:300})
  .image("public/icons/BB2.png", 385, 157, {width:300})
  .image("public/icons/BB3.png", 75, 377, {width:300})
  .fontSize(16).fillColor("#2c292a").text("CLIENT // ", 385, 374, {continued: true})
  .fillColor("#7e1417").text("BODYBEANZ")
  .moveDown(1)
  .fillColor("#2c292a").font('DinLight').text("»  LOGO DESIGN",{indent:15})
  .text("»  E-COMMERCE WEB DEVELOPMENT",{indent:15})
  .text("»  PACKAGING DESIGN",{indent:15})
  .text("»  MASCOT CREATION",{indent:15})
  .text("»  SOCIAL MEDIA MARKETING",{indent:15})
  .moveTo(385, 395).lineTo(587, 395).stroke("#2c292a");
  // CEG Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/icons/CEG1.png", 75, 157, {width:300})
  .image("public/icons/CEG2.png", 385, 157, {width:300})
  .image("public/icons/CEG3.png", 75, 377, {width:300})
  .fontSize(16).fillColor("#2c292a").font('DinMedium').text("CLIENT // ", 385, 374, {continued: true})
  .fillColor("#7e1417").text("COPYRIGHT ENFORCEMENT GROUP")
  .moveDown(1)
  .fillColor("#2c292a").font('DinLight').text("»  LOGO DESIGN",{indent:15})
  .text("»  GRAPHIC DESIGN",{indent:15})
  .text("»  PRINT COLLATERAL DESIGN",{indent:15})
  .text("»  WEB DESIGN & DEVELOPMENT",{indent:15})
  .moveTo(385, 395).lineTo(737, 395).stroke("#2c292a");
  // Vivioptal Page
  doc.addPage();
  mainmenu(doc);
  doc.image("public/icons/V1.png", 75, 157, {width:300})
  .image("public/icons/V2.png", 385, 157, {width:300})
  .image("public/icons/V3.png", 75, 377, {width:300})
  .fontSize(16).fillColor("#2c292a").font('DinMedium').text("CLIENT // ", 385, 374, {continued: true})
  .fillColor("#7e1417").text("VIVIOPTAL VITAMINS")
  .moveDown(1)
  .fillColor("#2c292a").font('DinLight').text("»  PACKAGING DESIGN",{indent:15})
  .text("»  PRODUCT PHOTOGRAPHY",{indent:15})
  .text("»  WEB DESIGN & DEVELOPMENT",{indent:15})
  .text("»  MARKETING",{indent:15})
  .text("»  BUSINESS DEVELOPMENT",{indent:15})
  .moveTo(385, 395).lineTo(650, 395).stroke("#2c292a");
}

function theTeam(doc) {
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/section-five-moniker-dark.png",50,190)
  .fillColor("#7e1417").fontSize(40).font('DinMedium')
  .text("GET ", 200, 195, {continued: true,lineGap:-10})
  .font('DinLight').fillColor("#2c292a").text("TO").text("KNOW YOUR",{lineGap:-10})
  .fillColor("#7e1417").font('DinMedium').text("TEAM")
  .image("public/images/tie.png", 245, 285, {width:450})
  .moveTo(200, 330).lineTo(465, 330).stroke("#2c292a")
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/bob.png", 50, 150, { width: 80 })
  .image("public/images/nicole.png", 50, 308, { width: 80 })
  .image("public/images/aldo.png", 50, 455, { width: 80 })
  .fillColor("#7e1417").fontSize(20).font('DinMedium').text("ROBERT AFSARI ", 145, 156, {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// CHIEF EXECUTIVE OFFICER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Bob received a degree in Neurobiology, Physiology and Behavioral Science from the University of California, Davis. As a published scientific author, Mr. Afsari brings a systematic and science based approach to helping companies thrive. Time spent as the Managing Director of a San Diego based Private Equity Firm has allowed Mr. Afsari to gather insight in a diverse range of industries. In addition to his business development and corporate finance background, Mr. Afsari proved his attained skill sets by winning The VP Contest. Mr. Afsari will serve as your new project manager as well as lead liaison for the projects committed.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").font('DinMedium').fontSize(20).text("NICOLE PEREIRA ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// CHIEF TECHNICAL OFFICER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Nicole has spent the majority of her life as a web and online marketing geek. Her expertise is hyper-focused on amplifying the Search Engine Optimization process as well as training others on her powerful process. Over the past 5 years, Mrs. Pereria has positively influenced and generated greater awareness for over 200 companies. In addition to SEO, Mrs. Pereria is an expert on generating effective blogs, socialmedia management and analytics quantification. Mrs. Pereria will serve as your new Director of SEO & Social Media Management.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").fontSize(20).font('DinMedium').text("ALDO JACOBO ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// CHIEF CREATIVE OFFICER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Through his six-year commitment as Creative Director and Art Director, Mr. Jacobo has added astonishing value, talent and insight to the growth of BMS. Brand Development is Aldo's primary focus, but he is also involved in numerous design elements under BMS development. He has experience working with companies all over the world, big and small. He is also fluent in Spanish with a talent for written translation.", {width: 600})
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/alvaro.png", 50, 150, { width: 80 })
  .image("public/images/marianne.png", 50, 278, { width: 80 })
  .image("public/images/nick.png", 50, 445, { width: 80 })
  .fillColor("#7e1417").fontSize(20).font('DinMedium').text("ALVARO FLORES ", 145, 156, {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// GRAPHIC DESIGNER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Mr. Flores graduated from San Diego State University with a Bachelor of Arts degree in Applied Arts & Sciences with emphasis on Graphic Design. Attaining a greater understanding of the fundamentals/theory/philosophy of design, he developed a passion for branding. Mr. Flores had the opportunity to intern with the San Diego State University Research Foundation in a re-branding project for a non-profit organization.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").fontSize(20).font('DinMedium').text("MARIANNE KOPP ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// PROJECT COORDINATOR")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Born in Brazil where she obtained a Bachelor of Social Communications with an emphasis in Public Relations in 2007 at Federal University of Parana, and then added a Bachelors in Business Management in 2011 from Pontificia Universidade Catolica do Parana, Ms. Kopp who is fluent in English and Portuguese, applied for exchange student status with UCSD. Ms. Kopp has also been a Boxer for 7 years and is now learning Muay Thai (we usually do what she says!). She is passionate about her career and it shows in her dedication and detailed work with each client.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").fontSize(20).font('DinMedium').text("NICHOLAS KOSKOWSKI ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// WEB PROGRAMMER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Mr. K has been computing professionally since 1997. With an Object Oriented Programming background he has worked on projects small and large. From the early days of Eclipse API for online games, to newer technologies such as InvOS – A production style inventory system for laboratories, Mr. K is well versed in a variety of programming languages including PHP, CSS/HTML, and more. Mr. K was also part of the emerging computer security industry, and has performed Penetration Testing audits for various financial institutions including, Bank of America, Chase and the San Diego Credit Union.", {width: 600})
  doc.addPage();
  mainmenu(doc);
  doc.image("public/images/dan.png", 50, 150, { width: 80 })
  .image("public/images/sean.png", 50, 295, { width: 80 })
  .image("public/images/paul.png", 50, 455, { width: 80 })
  .fillColor("#7e1417").fontSize(20).font('DinMedium').text("DAN DELLER ", 145, 156, {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// JR WEB DEVELOPER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("Hailing from the east coast, Dan showed up at our doorstep with an eagerness to learn and contribute to the team. After spending a few years in the Navy as an electronics technician, and seeing a lot of the world, he shifted gears towards the development industry. Currently attending Coleman U he boasts a background in HTML4/5, CSS2/3, Adobe Photoshop, Illustrator, and has a constant drive to always learn new developing tools. Match that with a background in networking and he has quickly made himself a valuable asset to our team.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").fontSize(20).font('DinMedium').text("SEAN FARIAS ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// ACCOUNT MANAGER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("A true native San Diegan, Sean Farias grew up locally with frequent exposure to the southern California marketplace. After finishing his secondary education, he left for the east coast to supplement his studies with a bachelors degree. Settling at the University of Virginia in Charlottesville, he then completed a double major in Economics and Sociology. After living several months abroad in Europe gathering international business knowledge, he then returned to the beautiful California climate. Mr. Farias expertise is largely centered around the service industry.", {width: 600})
  .moveDown(.75).fillColor("#7e1417").fontSize(20).font('DinMedium').text("PAUL MCMAHON ", {continued: true})
  .fillColor("#2c292a").fontSize(15).font('DinLight').moveDown(.2).text("// JR WEB DEVELOPER")
  .moveDown(.5).fontSize(14).font('Helvetica').text("With the world at his fingertips, Paul recognizes his interest and endless opportunity within the complex network of computer technology. As a junior web developer at BMS, Mr. McMahon concentrates on providing a unique human experience through seamless code and website creation from scratch. Constantly improving his abilities, he works to produce the highest level of invention possible on anything that crosses his screen. That is one thing that will never change.", {width: 600})
}

function titleText(doc,title,text) {
  doc.addPage();
  mainmenu(doc);
  doc.moveTo(125,190).lineTo(667,190)
  .stroke("#2c292a")
  .fontSize(30).fillColor('#2c292a').font('DinLight').text(title,125,190)
  .fillColor('#2c292a').fontSize(17).font('Helvetica').text(text,125,245,{width:542});
}

function titleTextSubList(doc,title,text,sub,list) {
  doc.addPage();
  mainmenu(doc);
  doc.moveTo(75,190).lineTo(717,190)
  .stroke("#2c292a")
  .fontSize(30).fillColor('#2c292a').font('DinLight').text(title.toUpperCase(),75,190)
  .moveDown(.5).fontSize(17).font('Helvetica').text(text,{width:642})
  .moveDown(0.5).fontSize(16).font('DinMedium').text(sub.toUpperCase(),{width:642,underline:true})
  .moveDown(0.5).fontSize(17).font('Helvetica');
  for (var i=0;i<list.length;i++) {
   doc.text("»  "+list[i]);
 }
}

function titleSubText(doc,title,sub,text) {
  doc.addPage();
  mainmenu(doc);
  doc.moveTo(75,190).lineTo(717,190)
  .stroke("#2c292a")
  .fontSize(30).fillColor("#7e1417").font('DinMedium').text("// ",75,190,{continued:true})
  .fillColor('#2c292a').font('DinLight').text(title.toUpperCase())
  .fontSize(16).font('DinMedium').text(sub.toUpperCase(),{width:642})
  .moveDown(1).fontSize(17).font('Helvetica').text(text,{width:642});
}

function iconsTitleSubText(doc,icons,title,sub,text) {
  doc.addPage();
  mainmenu(doc);
  var iconcount = 0;
  for (var i=0;i<icons.length;i++){
    doc.image("public/images/"+icons[i], 75+(70*iconcount), 170, {width: 50});
    iconcount += 1;
  }
  doc.moveTo(75,235).lineTo(717,235).stroke("#2c292a")
  .fontSize(30).fillColor("#7e1417").font('DinMedium').text("// ",75,235,{continued:true})
  .fillColor('#2c292a').font('DinLight').text(title.toUpperCase())
  .fontSize(16).font('DinMedium').text(sub.toUpperCase(),{width:642})
  .moveDown(0.75).fontSize(17).font('Helvetica').text(text,{width:642});
}

function iconsTitleSubTextList(doc,icons,title,sub,text,list) {
  doc.addPage();
  mainmenu(doc);
  var iconcount = 0;
  for (var i=0;i<icons.length;i++){
    doc.image("public/images/"+icons[i], 75+(70*iconcount), 170, {width: 50});
    iconcount += 1;
  }
  doc.moveTo(75,235).lineTo(717,235).stroke("#2c292a")
  .fontSize(30).fillColor("#7e1417").font('DinMedium').text("// ",75,235,{continued:true})
  .fillColor('#2c292a').font('DinLight').text(title.toUpperCase())
  .fontSize(16).font('DinMedium').text(sub.toUpperCase(),{width:642})
  .moveDown(0.75).fontSize(17).font('Helvetica').text(text,{width:642})
  .moveDown(0.5).fontSize(17).font('Helvetica');
  for (var i=0;i<list.length;i++) {
   doc.text("»  "+list[i]);
 }
}