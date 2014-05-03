'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
	var limit = req.query.count || 0;
	var skip = (req.query.page - 1) * limit || 0;
	var filterName, filterInfo, typeType = '';
	var sorters = {};
	if(req.query.filter !== null && typeof(req.query.filter) !== 'undefined'){
		filterName = req.query.filter.name;
		filterInfo = req.query.filter.info;
		typeType = req.query.filter.type;
	}
	if(req.query.sorting !== null && typeof(req.query.sorting) !== 'undefined'){
		console.log(req.query.sorting);
		sorters = req.query.sorting;
	}

	var filtersConfig = {
		'name' : new RegExp(filterName, 'i'),
		'info': new RegExp(filterInfo, 'i'),
		'type': new RegExp(typeType, 'i'),
  };

  return Thing.find(filtersConfig, null, {
		skip: skip,
		limit: limit,
		sort : sorters
  }, function (err, things) {
    if (!err) {
		Thing.count(filtersConfig, function(err, count){
			return res.send({result:things, total: count});
		});
    } else {
      return res.send(err);
    }
  });
};
