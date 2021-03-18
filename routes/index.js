let express = require('express');
let router = express.Router();

let newsJson = '{ "news": [ ' +
    '{ "w": "1", "h": "2", "file": "news/1", "image": "images/vaccine1.jpg", "strap": "International News", "title": "Quad nations to launch Asian vaccine drive to counter China", "body" : "The winners for the 2019 WA Media Awards were announced at a gala dinner on 2nd November.", "profile": "images/Mike.jpg", "author": "Michael Olivera" }, ' +
    '{ "w": "2", "h": "1", "file": "news/2", "image": "images/news1.png", "strap": "Events/Awards", "title": "Winners announced at WA Media Awards", "body" : "The winners for the 2019 WA Media Awards were announced at a gala dinner on 2nd November.", "profile": "", "author": "" }, ' +
    '{ "w": "1", "h": "3", "file": "news/3", "image": "images/news5.png", "strap": "Interview", "title": "Telum Talks To… Susana Tsui, CEO of Media, theAsianparent", "body" : "theAsianparent has named Susana Tsui, former CEO of Dentsu Aegis Network China, as the new CEO of Media in September. We find out more about her role and vision for the platform for parents.", "profile": "", "author": "" },' +
    '{ "w": "1", "h": "1", "file": "news/4", "image": "images/news3.jpg", "strap": "Events/Awards", "title": "Event wrap-up - Telum Talks To... The Star", "body" : "Telum recently hosted the latest edition of the Telum Talks To series, this time with Malaysias largest English publication, The Star.",  "profile": "xyz", "author": "abc" }' +
    ']}';

let newsHC = JSON.parse(newsJson);

//------------------------------------------------
let path = '/home/duncan/Telum/developers-vm/www.telummedia.com/jlogin1/';
let fs = require('fs');
let data = fs.readFileSync(path+'news.json', 'utf8');
let newsDyn = JSON.parse(data);
console.log(newsDyn);
//--------------------------------------------------


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('0000_login', { title: 'Telum: Login ' });
});

/* GET dashboard page. */
router.get('/Dashboard', function(req, res, next) {
  res.render('0001_dashboard', { title: 'Telum: Dashboard', news: newsDyn });
});

/* GET organisation page. */
router.get('/Organisation', function(req, res, next) {
  res.render('0010_organisation', { title: 'Telum: Organisation' });
});

/* GET overview page. */
router.get('/Consultation', function(req, res, next) {
  res.render('0011_consultation', { title: 'Telum: Consultation' });
});

/* GET overview page. */
router.get('/Packages', function(req, res, next) {
  res.render('0100_packages', { title: 'Telum: Packages' });
});

/* GET consultation page. */
router.get('/About', function(req, res, next) {
  res.render('0101_about', { title: 'Telum: About' });
});

/* GET consultation page. */
router.get('/Contact', function(req, res, next) {
  res.render('0110_contact', { title: 'Telum: Contact' });
});

module.exports = router;
