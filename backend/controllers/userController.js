import fs from 'fs';
import passport from 'passport';
import path from 'path';
import Product from '../models/productModel';
import User from '../models/userModel';

// -------------------------------- User Authentication --------------------------------

export const currentUserDetails = (req, res) => {
    if (!req.user) res.send();
    else res.json(req.user);
}

export const login = (req, res, next) => {
    passport.authenticate('local', function (err, account) {
        req.logIn(account, function () {
            res.status(err ? 500 : 200).send(err ? err : account);
        });
    })(req, res, next);
}

export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.json({ message: 'User logged out' });
    });
}

// -------------------------------- Manage and View Users --------------------------------

export const createUser = async (req, res) => {
    let newUser = new User(req.body)
    if (req.file) {
        let file = req.file;
        let image = fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename));
        newUser.avatar = `data:image/image/png;base64,${image.toString('base64')}`;
    }
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

export const updateUser = async (req, res) => {
    if (req.file) {
        let file = req.file;
        let image = fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename));
        req.body.avatar = `data:image/image/png;base64,${image.toString('base64')}`;
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId)
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.send(err);
    }
}

export const displayUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

export const userList = async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

// -------------------------------- Manage User Addresses --------------------------------

export const addAddress = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { "addresses": req.body } },
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

export const updateAddress = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId, "addresses._id": req.params.addressId },
            { $set: { "addresses.$": req.body } },
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId, "addresses._id": req.params.addressId },
            { $pull: { addresses: { _id: req.params.addressId } } },
            { new: true, runValidators: true }
        );
        res.json(user);
    } catch (err) {
        res.send(err);
    }
}

// -------------------------------- Manage User Cart --------------------------------

export const addToCart = async (req, res) => {
    try {
        const product = await Product.findById(req.body.product)
        if (product.quantity < req.body.quantity) {
            res.json({ message: 'Not sufficient quantity available' });
            return;
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.body.product,
            { $inc: { quantity: -req.body.quantity } },
            { new: true, runValidators: true });
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { cart: req.body } },
            { new: true, runValidators: true });
        res.json({ product: updatedProduct, user: user });
    } catch (err) {
        res.send(err);
    }
}

export const updateInCart = async (req, res) => {
    try {
        if (req.body.quantity < 1) {
            deletefromCart(req, res);
            return;
        }
        const user = await User.findOne(
            { _id: req.params.userId, "cart.product": req.params.productId },
            { "cart.$": 1 });
        const quantity = req.body.quantity - user.cart[0].quantity
        const product = await Product.findById(req.params.productId);
        if (product.quantity < quantity) {
            res.json({ message: 'Not sufficient quantity available' });
            return;
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { $inc: { quantity: -quantity } },
            { new: true, runValidators: true });
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId, "cart.product": req.params.productId },
            { $set: { "cart.$.quantity": req.body.quantity } },
            { new: true, runValidators: true });
        res.json({ product: updatedProduct, user: updatedUser })
    } catch (err) {
        res.send(err);
    }
}

export const deletefromCart = async (req, res) => {
    try {
        const user = await User.findOne(
            { _id: req.params.userId, "cart.product": req.params.productId },
            { "cart.$": 1 });
        const quantity = user.cart[0].quantity;
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            { $inc: { quantity: +quantity } },
            { new: true, runValidators: true });
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId, "cart.product": req.params.productId },
            { $pull: { cart: { product: req.params.productId } } },
            { new: true, runValidators: true });
        res.json({ user: updatedUser, product: product });
    } catch (err) {
        res.send(err);
    }
}