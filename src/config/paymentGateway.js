import Stripe from 'stripe';

// Stripe API secret key (store this securely in environment variables)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key';

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Function to create a payment intent (for handling payments)
export const createPaymentIntent = async (amountInCents) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,  // The amount in cents (e.g., 1000 = $10.00)
      currency: 'usd',         // Currency (USD in this case)
      automatic_payment_methods: { enabled: true },  // Enable automatic payment methods (like card payments)
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Error creating payment intent: ' + error.message);
  }
};

// Function to confirm a payment (after client submits payment details)
export const confirmPayment = async (paymentIntentId, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Error confirming payment: ' + error.message);
  }
};
