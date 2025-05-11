var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CybersecurityMars' });
});

router.get('/comentarios', function(req, res, next) {
  res.render('Comentarios', { title: 'CybersecurityMars' });
});

module.exports = router;
