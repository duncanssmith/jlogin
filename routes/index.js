var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('0000_login', { title: 'Telum: Login ' });
});

/* GET dashboard page. */
router.get('/Dashboard', function(req, res, next) {
  res.render('0001_dashboard', { title: 'Telum: Dashboard' });
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
