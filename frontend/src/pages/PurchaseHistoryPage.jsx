import { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import { Calendar, Package, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const PurchaseHistoryPage = () => {
  const { orders, getMyOrders, loading } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          className="text-3xl font-bold text-emerald-400 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Purchase History
        </motion.h1>

        {orders.length === 0 ? (
          <motion.div
            className="text-center bg-gray-800 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No purchases yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start shopping to see your order history here.
            </p>
            <Link
              to="/"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Order Header */}
                <div className="bg-gray-700 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-600">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Order ID:</span>
                    <span className="text-sm font-mono text-emerald-400">
                      {order._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-400">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.products.map((item) => (
                    <div
                      key={item.product?._id || item._id}
                      className="flex items-center gap-4 py-2 border-b border-gray-700 last:border-none"
                    >
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-600">
                        <img
                          src={item.product?.image || "/placeholder.png"}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">
                          {item.product?.name || "Product no longer available"}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Price: ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-300">
                        x{item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default PurchaseHistoryPage;
