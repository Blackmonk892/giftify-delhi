import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/payments/all-orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-emerald-400">
        Order Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Shipping Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  {order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="font-bold">
                    {order.user?.name || "Unknown User"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.user?.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-400 font-bold">
                  ₹{order.totalAmount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                  {order.shippingAddress ? (
                    <div>
                      <div className="font-bold">
                        {order.shippingAddress.fullName}
                      </div>
                      <div>{order.shippingAddress.address}</div>
                      <div>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode}
                      </div>
                      <div>Phone: {order.shippingAddress.phone}</div>
                    </div>
                  ) : (
                    <span className="italic text-gray-500">
                      No address provided
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default OrdersList;
