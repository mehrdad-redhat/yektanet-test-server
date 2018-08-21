let config = require('../config.json');
let _ = require('lodash');
let Q = require('q');
let mongo = require('mongoskin');
let db = mongo.db(config.connectionString, {native_parser: true});
db.bind('products');

let service = {};

service.getAll = getAll;
service.getById = getById;
service.update = update;

module.exports = service;


function getAll() {
	let deferred = Q.defer();
	console.log(db);
	db.products.find().toArray((err, products) => {
		if (err) deferred.reject(err.name + ': ' + err.message);

		deferred.resolve(products);
	});

	return deferred.promise;
}

function getById(_id) {
	let deferred = Q.defer();

	db.products.findOne({_id:Number(_id)}, (err, product) => {
		if (err) deferred.reject(err.name + ': ' + err.message);

		if (product) {

			deferred.resolve(product);
		} else {

			deferred.resolve();
		}
	});

	return deferred.promise;
}


function update(_id, userParam) {
	let deferred = Q.defer();


	let set = userParam;


	db.products.update(
		{_id: Number(_id)},
		{$set: set},
		(err) => {
			if (err) deferred.reject(err.name + ': ' + err.message);

			deferred.resolve();
		});

	return deferred.promise;
}

