import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: [
            "Not processed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ],
        default: "Not processed",
    },
    dateDelivered: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);