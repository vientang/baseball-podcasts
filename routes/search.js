var express = require('express');
var superagent = require('superagent');
var router = express.Router();

/* GET users listing. */
router.get('/:term', function(req, res, next) {
	var term = req.params.term;
	// make request to iTunes search API
	var url = 'http://itunes.apple.com/search';
	superagent
		.get(url)
		.query({media: 'podcast', term: term})
		.set('Accept', 'application/json')
		.end(function(err, response) {
			if (err) {
				res.json({
			  	confirmation: 'Failed',
			  	message: err
			  });
			  return;
			}

			var data = JSON.parse(response.text);
			res.json({
		  	confirmation: 'Success',
		  	response: data.results
		  });
		})
});

module.exports = router;
