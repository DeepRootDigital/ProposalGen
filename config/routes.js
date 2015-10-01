var proposal = require('./proposal');
var phase = require('./phase');
var images = require('./images');

module.exports = function (app) {
    
    app.get('/', function (req, res) {
        res.render('index');
    });


    // Proposals Routes
    //app.post('/genPDF', proposal.genproposal());
    app.post('/proposal/save', proposal.addProposal);
    app.get('/proposal/list', proposal.list);
    app.post('/proposal/get', proposal.get);
    app.post('/proposal/generate', proposal.generate);

    // Phases Routes
    app.get('/phase/list', phase.list);
    app.get('/phase/get', phase.get);
    app.post('/phase/save', phase.save);

    //app.post('/uploadImage', images.uploadIcon);

    //app.post('/proposalpage', proposalPage.add);
    //app.get('/proposalpage', proposalPage.list);
};