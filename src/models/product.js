import mongoose from 'mongoose';

const productGallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  color: { type: String, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  summary: String,
  coverImage: String,
  gallery: [productGallerySchema],
  attributes: [{
    size: String,
    color: String,
    price: Number,
    stockQuantity: Number,
  }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
