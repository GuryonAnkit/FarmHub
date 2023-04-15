import Product from '../models/productModel';
import fs from 'fs';
import path from 'path';

// -------------------------------- Manage and view products --------------------------------

export const addProduct = async (req, res) => {
    let newProduct = new Product(req.body);
    if (req.files) {
        let files = req.files;
        files.forEach(file => {
            let image = fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename));
            newProduct.images.push({ data: `data:image/image/png;base64,${image.toString('base64')}` });
        })
    }
    try {
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.send(err);
    }
}

export const updateProduct = async (req, res) => {
    if (!req.files === []) {
        let files = req.files;
        req.body.images = [];
        files.forEach(file => {
            let image = fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename));
            req.body.images.push({ data: `data:image/image/png;base64,${image.toString('base64')}` });
        })
    }
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(product);
    } catch (err) {
        res.send(err);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.send(err);
    }
}

export const displayProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('reviews.user');
        const productObj = product.toObject();
        if (req.user) {
            productObj.currentUserReview = product.reviews.find(review => review.user._id.equals(req.user._id));
            productObj.reviews = product.reviews.filter(review => !review.user._id.equals(req.user._id));
        }
        res.json(productObj);
    } catch (err) {
        res.send(err);
    }
}

export const productList = async (req, res) => {
    try {
        const products = await Product.find(
            { category: req.params.category },
            'name price images reviews brand')
            .sort(req.params.sort !== 'none' ? req.params.sort : '');
        const brands = await Product.find({ category: req.params.category }).distinct('brand');
        res.json({ products: products, brands: brands })
    } catch (err) {
        res.send(err);
    }    
}
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (err) {
        res.send(err);
    }    
}

export const productSearch = async (req, res) => {
    try {
        const products = await Product.find(
            { $text: { $search: req.params.term } },
            'name price images reviews brand')
            .sort(req.params.sort !== 'none' ? req.params.sort : '');
        res.json(products);
    } catch (err) {
        res.send(err);
    }
}

// -------------------------------- Reviews --------------------------------

export const addReview = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            { $push: { reviews: req.body } },
            { new: true, runValidators: true },
        );
        res.json(product);
    } catch (err) {
        res.send(err);
    }
}

export const updateReview = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId, "reviews.user": req.params.userId },
            { $set: { "reviews.$.rating": req.body.rating, "reviews.$.description": req.body.description } },
            { new: true },
        );
        res.json(product);
    } catch (err) {
        res.send(err);
    }
}

export const deleteReview = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId, "reviews.user": req.params.userId },
            { $pull: { reviews: { user: req.params.userId } } },
            { new: true },
        );
        res.json(product);
    } catch (err) {
        res.send(err);
    }
}