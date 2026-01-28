import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,

  getMyOrders: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/payments/history");
      set({ orders: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch orders");
    }
  },
}));
