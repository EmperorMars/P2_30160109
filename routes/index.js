var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CybersecurityMars' });
});

router.get('/Contact', function(req, res, next) {
  res.render('Contact', { title: 'CybersecurityMars' });
});

router.get('/pago', function(req, res, next) {
  res.render('Pago', { title: 'CybersecurityMars'});
});

router.get('/Carritodecompras', function(req, res, next) {
  res.render('Carritodecompras', { titlr: 'CybersecurityMars' });
});

module.exports = router;
