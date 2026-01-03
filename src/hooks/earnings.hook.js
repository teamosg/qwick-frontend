import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config";
import handleApiError from "@/services/handleApiError";

export const useGetMyEarnings = () => {
    return useQuery({
        queryKey: ["myEarnings"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/my-earnings/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch earnings" });
            }
        },
        staleTime: 1000 * 60 * 2, // cache for 2 mins
    });
};

export const useGetMyWithdrawals = () => {
    return useQuery({
        queryKey: ["myWithdrawals"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/withdrawals/");
                return res?.data || [];
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch withdrawals" });
            }
        },
        staleTime: 1000 * 60 * 2, // cache for 2 mins
    });
};
