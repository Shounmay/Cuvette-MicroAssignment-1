const { Router } = require('express');
const route = Router();
const CategoryModel = require('../models/category');
const GalleryModel = require('../models/gallery');

route.get('/get-all-categories', async (req, res, next) => {
	try {
		let categoryList = [];
		AllCategoryDetails = await CategoryModel.find({});

		await AllCategoryDetails.forEach((category) => {
			categoryList.push(category.name);
		});
		res.send(categoryList);
	} catch {
		console.log(error);
		next(error);
	}
});

route.get('/:category/:shuffle', async (req, res, next) => {
	try {
		const category = req.params.category;
		const shuffle = req.params.shuffle;

		if (!category) {
			res.status(400).send('Bad Request');
		}

		const galleryDetails = await GalleryModel.find({
			category: { $in: [category] },
		}).limit(4);

		res.json(galleryDetails);
	} catch {
		console.log(error);
		next(error);
	}
});

module.exports = route;
