import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config.js";
import { toast } from "sonner";

/**
 * ================================
 * Payment Hooks
 * ================================
 * This file contains hooks for handling
 * payment-related operations like
 * withdraw transactions, balances, etc.
 */

/**
 * Hook: useWithdrawTransactions
 * -----------------------------------
 * Fetches user's withdrawal transactions list.
 *
 * Endpoint: GET /v1/payment/withdraw/
 * Response: { status: 200, success: true, data: [] }
 */

// get wallet balance
export const useGetWalletBalance = () => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/payment/wallet/");
        return res?.data?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch wallet balance";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 2, // cache for 2 mins
  });
};

export const useWithdrawTransactions = () => {
  return useQuery({
    queryKey: ["withdrawTransactions"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/payment/withdraw/");
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch withdraw transactions";
        toast.error(message);
        throw new Error(message);
      }
    },
    // enabled: !!localStorage.getItem("token"), // Only if logged in
    staleTime: 1000 * 60 * 2, // cache for 2 mins
  });
};
