let express = require('express');
let router = express.Router();
let productService = require('services/products.service');

// routes
router.get('/', getAll);
router.get('/:_id', getProduct);
router.put('/:_id', update);

module.exports = router;



function getAll(req,res) {

	productService.getAll()
		.then((products) => {
			res.send(products);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
}

function getProduct(req, res) {
	productService.getById(req.params._id)
		.then((product) => {
			if (product) {
				res.send(product);
			} else {
				res.sendStatus(404);
			}
		})
		.catch((err) => {
			res.status(400).send(err);
		});
}

function update(req, res) {
	productService.update(req.params._id, req.body)
		.then(() => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
}
