import mongoose from 'mongoose';
// Address Schema for storing user addresses
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  isDefault: { type: Boolean, default: false },
},{timestamps:true});

// const Address = mongoose.model('Address', addressSchema);

export default addressSchema;
