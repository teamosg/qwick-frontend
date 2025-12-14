import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config.js";
import { toast } from "sonner";
import handleApiError from "@/services/handleApiError.js";

// Add Social Media Account Hook
export const useAddSocialMedia = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await axiosPrivate.post("/v1/account/social-media-otp/", payload);
            return res.data;
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to generate OTP" });
        },
    });
};

// Verify Social Media Account Hook
export const useVerifySocialMedia = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const res = await axiosPrivate.post("/v1/account/social-media-verify/", payload);
            return res.data;
        },
        onSuccess: (data) => {
            if (data?.status) {
                toast.success(data?.message || "Account verified successfully!");
                queryClient.invalidateQueries({ queryKey: ["profile"] });
            } else {
                handleApiError({ error: data, errorMessage: "Failed to verify account" });
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to verify account" });
        },
    });
};
