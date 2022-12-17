const { Router } = require('express');
const route = Router();
const CategoryModel = require('../models/category');
const GalleryModel = require('../models/gallery');

route.get('/get-all-categories', async (req, res, next) => {
	try {
		let categoryList = [];
		AllCategoryDetails = await CategoryModel.find({});
		console.log();
		await AllCategoryDetails.forEach((category) => {
			categoryList.push(category.name);
		});
		res.send(categoryList);
	} catch {
		console.log(error);
		next(error);
	}
});

module.exports = route;
