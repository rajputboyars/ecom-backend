import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  const { userId, shippingAddress, products } = req.body;

  try {
    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }

      // Calculate price for product (depending on size/color)
      const variant = product.attributes.find(attr => attr.size === item.size && attr.color === item.color);
      if (variant) {
        totalPrice += variant.price * item.quantity;
        orderProducts.push({ product: item.product, size: item.size, color: item.color, quantity: item.quantity, price: variant.price });
      } else {
        return res.status(400).json({ message: 'Invalid size/color combination' });
      }
    }

    const newOrder = new Order({
      user: userId,
      shippingAddress,
      products: orderProducts,
      totalPrice,
      status: 'Pending',
      paymentStatus: 'Pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user shippingAddress');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
}
export async function getAllOrders(req, res) {
    const { page = 1, limit = 10, status } = req.query;
  
    try {
      // Create query object to filter by status if provided
      const query = status ? { status } : {};
  
      // Fetch orders with pagination
      const orders = await Order.find(query)
        .populate('user shippingAddress') // Populate user and shippingAddress fields
        .skip((page - 1) * limit) // Skip orders for pagination
        .limit(Number(limit)) // Limit the number of orders
        .sort({ createdAt: -1 }); // Sort orders by creation date, newest first
  
      // Get the total count of orders for pagination purposes
      const totalOrders = await Order.countDocuments(query);
  
      res.status(200).json({
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: Number(page),
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  }
  