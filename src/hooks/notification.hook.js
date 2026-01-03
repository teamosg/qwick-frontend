import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config";
import handleApiError from "@/services/handleApiError";

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/notifications/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch notifications" });
            }
        },
        staleTime: 1000 * 60 * 2, // cache for 2 mins
    });
};
