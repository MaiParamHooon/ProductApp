const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

// use !mdbc snippets of node express mongodb

const methodOverride = require("method-override");

mongoose
	.connect("mongoLink", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUndefinedTopology: true,
	})
	.then(() => {
		console.log("successfully connected");
	})
	.catch((err) => {
		console.log("No connection");
	});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
	const { category } = req.query;
	if (category) {
		// const products = await Product.find({category: category});
		const products = await Product.find({ category });
		res.render("products/index", { products, category });
	} else {
		const products = await Product.find({});
		res.render("products/index", { products, category: "All" });
	}

	// res.send("All products will be here");
});

app.get("/products/new", (req, res) => {
	res.render("products/new");
});

app.post("/products", async (req, res) => {
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect("/products");
});

app.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const productFound = await Product.findById(id);
	res.render("products/show", { productFound });
});

app.get("/products/:id/edit", async (req, res) => {
	const { id } = req.params;
	const productFound = await Product.findById(id);
	res.render("products/edit", { productFound });
});

app.put("/products/:id", async (req, res) => {
	const { id } = req.params;
	const productFound = await Product.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/products/${id}`);
	// res.redirect("/products/" + id);
});

app.delete("/products/:id", async (req, res) => {
	const { id } = req.params;
	await Product.findByIdAndDelete(id);
	res.redirect("/products");
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
