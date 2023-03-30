import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: "customer",
    },
    phoneNumber: { type: Number, required: true, unique: true },
    addresses: {
        type: [{
            area: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            pincode: { type: Number },
        }]
    },
    cart: [{
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }]
}, {
    timestamps: true,
    virtuals: {
        cartTotal: {
            get() {
                if(!this.populated('cart.product'))
                    return null;
                let cartSubtotal = 0;
                for (const item of this.cart)
                    cartSubtotal += item.product.price * item.quantity;
                return cartSubtotal;
            }
        },
    }
});

userSchema.set('toJSON', { getters: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

// Compare Password
userSchema.methods.comparePassword = async function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);