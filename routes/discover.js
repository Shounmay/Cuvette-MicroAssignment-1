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

//added to favorites API
route.post('/like/:imageId', async (req, res, next) => {
	try {
		const imageId = req.params.imageId;
		if (!imageId) {
			res.status(400).send('Bad Request');
		}

		let likeValue;

		const imageDetails = await GalleryModel.findOne({ _id: imageId });

		if (imageDetails) {
			if (imageDetails.likes) {
				likeValue = 0;
			} else {
				likeValue = 1;
			}
		}

		await GalleryModel.updateOne(
			{ _id: imageId },
			{ $set: { likes: likeValue } }
		);

		res.send('Favorite updated successfully');
	} catch (error) {
		console.log(error);
		next(error);
	}
});

route.get('/:category/:shuffle?', async (req, res, next) => {
	try {
		const category = req.params.category;
		const shuffle = req.params.shuffle;
		const sortByDate = req.query.sortByDate;
		const filterByLike = req.query.filterByLike;

		if (!category) {
			res.status(400).send('Bad Request');
		}

		let skip = parseInt(shuffle) || 0;

		let sort = 1;
		if (sortByDate) {
			if (sortByDate == 'asc') {
				sort = 1;
			} else if (sortByDate == 'desc') {
				sort = -1;
			}
		}
		let filter = {};
		if (filterByLike) {
			filter = { likes: 1 };
		}

		const galleryDetails = await GalleryModel.find({
			category: { $in: [category] },
			...filter, //filter to be expanded in the form of an object
		})
			.limit(4)
			.sort({ createdAt: sort })
			.skip(skip);

		res.json(galleryDetails);
	} catch {
		console.log(error);
		next(error);
	}
});

module.exports = route;
