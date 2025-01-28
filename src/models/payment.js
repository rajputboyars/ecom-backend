import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: String, // e.g., Visa, MasterCard, PayPal
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  transactionId: String,
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
