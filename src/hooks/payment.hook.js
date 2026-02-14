import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config.js";
import handleApiError from "@/services/handleApiError.js";
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
      if (data?.success) {
        const redirect = data?.checkout_url
        window.open(redirect, "_blank", "noopener,noreferrer");

        toast.success(data?.message || "Redirecting to payment gateway...");
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




export const useWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async (payload) => {
      const res = axiosPrivate.post("/v1/payment/withdraw/", payload)
      return res
    },
    onSuccess: (data) => {
      console.log(data)
      if (data?.status) {
        toast.success(data?.data?.message);

        queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
        queryClient.invalidateQueries({ queryKey: ["withdrawTransactions"] });
        queryClient.invalidateQueries({ queryKey: ["depositTransactions"] });
      } else {
        toast.error(data?.error || "Failed to withdraw");
      }
    },
    onError(error) {
      handleApiError({ error, errorMessage: "Failed to withdraw" })
    }
  })
}

export const useProcessWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["processWithdrawal"],
    mutationFn: async (payload) => {
      const res = await axiosPrivate.post("/v1/payment/withdraw/process/", payload);
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Withdrawal processed successfully");
        queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      } else {
        toast.error(data?.reason || data?.error || "Failed to process withdrawal");
      }
      queryClient.invalidateQueries({ queryKey: ["withdrawTransactions"] });
    },
    onError: (error) => {
      const responseData = error?.response?.data;
      if (responseData && !responseData.success && responseData.reason) {
        toast.error(responseData.reason);
      } else {
        handleApiError({ error, errorMessage: "Failed to process withdrawal" });
      }
      queryClient.invalidateQueries({ queryKey: ["withdrawTransactions"] });
    },
  });
};

export const useGetCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/payment/currencies/");
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch currencies";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour stale time
  });
};
