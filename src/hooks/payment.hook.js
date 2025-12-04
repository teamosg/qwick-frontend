import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config.js";
import handleApiError from "@/services/handleApiError.js";
import toast from "react-hot-toast";

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


export const useGetDepositTransactions = () => {
  return useQuery({
    queryKey: ["depositTransactions"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/payment/deposit/");
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch deposit transactions";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 2,
  });
};



export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addPaymentMethod"],
    mutationFn: async () => {
      const res = await axiosPrivate.post("/v1/payment/stripe/connect/onboarding/");
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.account_id) {
        const redirect = data?.onboarding_url
        window.open(redirect, "_blank", "noopener,noreferrer");
        queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to add payment method" })
    }
  })
}



export const useDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deposit"],
    mutationFn: async (payload) => {
      const res = await axiosPrivate.post("/v1/payment/deposit/", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        const redirect = data?.deposit_url
        window.open(redirect, "_blank", "noopener,noreferrer");

        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
        queryClient.invalidateQueries({ queryKey: ["withdrawTransactions"] });
        queryClient.invalidateQueries({ queryKey: ["depositTransactions"] });
      } else {
        toast.error(data?.message || "Failed to deposit");
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to deposit" })
    }
  })
}