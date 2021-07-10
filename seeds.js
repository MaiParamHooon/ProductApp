const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
	.connect("mongodb://localhost:27017/farmStand", {
		useNewUrlParser: true,
		useUndefinedTopology: true,
	})
	.then(() => {
		console.log("successfully connected");
	})
	.catch((err) => {
		console.log("No connection");
	});

// const p = new Product({
// 	name: "Grapes",
// 	price: 10,
// 	category: "fruit",
// });

// p.save()
// 	.then((p) => {
// 		console.log(p);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const seedProduct = [
	{
		name: "Grapes",
		price: 100,
		category: "fruit",
	},
	{
		name: "Bindi",
		price: 200,
		category: "vegetable",
	},
	{
		name: "Milk",
		price: 300,
		category: "dairy",
	},
];

Product.insertMany(seedProduct)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
