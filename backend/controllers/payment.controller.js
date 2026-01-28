import { razorpay } from "../lib/razorpay.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import crypto from "crypto";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode, shippingAddress } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    products.forEach((product) => {
      const amount = Math.round(product.price * 100); // Razorpay also works in smallest currency unit (paise)
      totalAmount += amount * product.quantity;
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100,
        );
      }
    }

    // Create a Razorpay Order
    const options = {
      amount: totalAmount,
      currency: "INR", // Change to USD if your Razorpay account supports international payments
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        address: JSON.stringify(shippingAddress),
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          })),
        ),
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      amount: totalAmount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // Sending Public Key to frontend
    });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Fetch the order details from Razorpay to get the metadata/notes we saved earlier
      // Note: Razorpay orders don't return notes in the standard fetch sometimes, so usually
      // we persist the order details in our DB temporarily, OR we trust the frontend to send the products back.
      // HOWEVER, relying on frontend for product details in 'success' is insecure.

      // BETTER APPROACH: Fetch the order from Razorpay to retrieve the 'notes' we saved.
      const orderDetails = await razorpay.orders.fetch(razorpay_order_id);
      const {
        couponCode,
        userId,
        products: productsStr,
        address: addressStr,
      } = orderDetails.notes;

      const products = JSON.parse(productsStr);
      const shippingAddress = JSON.parse(addressStr);

      // 2. Deactivate Coupon if used
      if (couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: couponCode,
            userId: userId,
          },
          {
            isActive: false,
          },
        );
      }

      // 3. Create new Order
      const newOrder = new Order({
        user: userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: orderDetails.amount / 100, // convert paise to rupees/dollars
        razorpayOrderId: razorpay_order_id, // You might want to rename this field in your model to 'paymentId' or keep it as is
        shippingAddress: shippingAddress,
      });

      await newOrder.save();

      // 4. Logic for creating a new coupon for high-value orders
      if (orderDetails.amount >= 2000000) {
        // 20000 rupees/dollars in paise
        await createNewCoupon(userId);
      }

      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}

// ... existing imports and code ...

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "products.product",
        select: "name image", // We only need name and image for display
      })
      .sort({ createdAt: -1 }); // Show newest orders first

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching user orders", error: error.message });
  }
};

// 4. NEW: Admin Function to get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({ path: "user", select: "name email" })
      .populate({ path: "products.product", select: "name image" })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all orders", error: error.message });
  }
};
