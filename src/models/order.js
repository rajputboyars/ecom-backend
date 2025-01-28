import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    size: String,
    color: String,
    quantity: { type: Number, required: true },
    price: Number,
  }],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Pending',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  paymentMethod: String, // e.g., Visa, MasterCard, PayPal
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
