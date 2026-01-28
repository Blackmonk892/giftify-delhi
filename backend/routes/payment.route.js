import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
  getUserOrders,
  getAllOrders,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.get("/history", protectRoute, getUserOrders); // <--- ADD THIS LINE
router.get("/all-orders", protectRoute, adminRoute, getAllOrders); // New Admin Route

export default router;
