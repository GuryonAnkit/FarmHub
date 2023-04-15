import Order from '../models/orderModel';
import User from '../models/userModel';

export const createOrder = async (req, res) => {
    try {
        const user = await User.findById(req.body.user).populate('cart.product');
        let newOrder;
        let newOrders = [];
        for (const item of user.cart) {
            newOrder = new Order({
                product: item.product._id,
                quantity: item.quantity,
                totalAmount: (item.product.price * item.quantity),
                user: req.body.user,
                address: req.body.address
            })
            newOrders.push(newOrder);
        }
        const orders = await Order.insertMany(newOrders, { populate: "product" });
        await User.findByIdAndUpdate(
            req.body.user,
            { $set: { cart: [] } },
            { new: true, runVaidators: true });
        res.json(orders);
    } catch (err) {
        res.send(err);
    }
}

export const orderInfo = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('product');
        res.json(order);
    } catch (err) {
        res.send(err);
    }
}

export const updateOrder = async (req, res) => {
    try {
        let dd
        if (req.body.status === 'Delivered')
            dd = new Date();
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status: req.body.status, dateDelivered: dd },
            { new: true, runValidators: true });
        res.json(order);                
    } catch (err) {
        res.send(err);
    }
}

export const orderList = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        res.send(err);
    }
}

export const userOrder = async (req, res) => {
    try {
        const orders = await Order.find({user:req.params.userId}).populate('product');
        res.json(orders);
    } catch (err) {
        res.send(err);
    }
}