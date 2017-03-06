var express = require('express');
var superagent = require('superagent');
var router = express.Router();
var parseString = require('xml2js').parseString;

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

			// parse data from xml to json
			var xml = response.text;
			parseString(xml, function (err, result) {
				if (result) {
					var rss = result.rss
					var channel = rss.channel
					if (channel.length) {
						channel = channel[0]
					}
				  res.json({
				  	confirmation: "Success", 
				  	podcast: channel
				  })
				}
			})			
		})
})

module.exports = router;
