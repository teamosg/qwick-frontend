import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../lib/axios.config.js";
import handleApiError from "@/services/handleApiError.js";

export const useGetWebsiteSettings = () => {
    return useQuery({
        queryKey: ["website-settings"],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get("/v1/website-setting/");
                return res?.data?.data;
            } catch (error) {
                handleApiError({
                    error,
                    throwError: true,
                    errorMessage: "Failed to fetch website settings",
                });
            }
        },
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
