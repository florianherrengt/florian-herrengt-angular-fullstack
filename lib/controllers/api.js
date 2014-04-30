'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
	var limit = req.query.count || 0;
	var skip = (req.query.page - 1) * limit || 0;
	var filterName, filterInfo = '';
	var sorterName = 'asc';
	if(req.query.filter !== null && typeof(req.query.filter) !== 'undefined'){
		filterName = req.query.filter.name;
		filterInfo = req.query.filter.info;
	}
	if(req.query.sorting !== null && typeof(req.query.sorting) !== 'undefined'){
		sorterName = req.query.sorting.name;
	}

	var filterAndSorter = {
		'name' : new RegExp(filterName, 'i'),
		'info': new RegExp(filterInfo, 'i'),
  };

  return Thing.find(filterAndSorter, null, {
		skip: skip,
		limit: limit,
		sort : {
			name: sorterName
		}
  }, function (err, things) {
    if (!err) {
			Thing.count(filterAndSorter, function(err, count){
				return res.send({result:things, total: count});
			});
      // return res.send(things);
    } else {
      return res.send(err);
    }
  });
};
