import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useGetNotificationSettings = () => {
    return useQuery({
        queryKey: ["notification-settings"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/notification-settings/");
                return res?.data?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch notification settings" });
            }
        },
    });
};

export const useUpdateNotificationSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            try {
                const res = await axiosPrivate.patch("/v1/notification-settings/", payload);
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to update notification settings" });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notification-settings"]);
        },
    });
};
