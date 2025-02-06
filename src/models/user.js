import mongoose from 'mongoose';
import addressSchema from './address.js';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'buyer'], // Only two roles allowed
    default: 'buyer', // Default role is 'buyer'
  },
  addresses: [addressSchema],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  cart: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
