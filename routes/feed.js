var express = require('express');
var superagent = require('superagent');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var url = req.query.url
	if (url == null) {
		res.json({
			confirmation: 'Failed',
			message: 'Missing Feed URL'
		})
		return
	}
	superagent
		.get(url)
		.query(null)		
		.end(function(err, response) {
			if (err) {
				res.json({
			  	confirmation: 'Failed',
			  	message: err
			  })
			  return
			}
			res.send(response.text)
		})
})

module.exports = router;
