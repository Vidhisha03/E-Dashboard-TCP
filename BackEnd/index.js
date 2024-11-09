const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

// Register route
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send("Something went wrong");
        }
        resp.send({ result, auth: token });
    });
});

// Login route
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send("Something went wrong");
                }
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: "No User found" });
        }
    } else {
        resp.send({ result: "No User found" });
    }
});

// Add Product route
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// Get all products
app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Product found" });
    }
});

// Delete product by ID
app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// Get product by ID
app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found." });
    }
});

// Update product by ID
app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

// Search products by key (name, category, description, brand, or price)
app.get("/search/:key", async (req, resp) => {
    const key = req.params.key; // Access key from params
    let result = await Product.find({
        "$or": [
            { name: { $regex: key, $options: 'i' } },
            { category: { $regex: key, $options: 'i' } },
            { description: { $regex: key, $options: 'i' } },
            { brand: { $regex: key, $options: 'i' } },
            { price: key }
        ]
    });
    resp.send(result);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
