import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useQuery } from "@tanstack/react-query";

export const useGetOtherUser = ({ userName, enabled }) => {
    return useQuery({
        queryKey: ["otherUser", userName],
        enabled,

        retry: false, // ✅ TURN OFF RETRY COMPLETELY
        retryOnMount: false, // ✅ Also prevent retry on remount

        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(
                    `/v1/account/profile/${userName}/`
                );
                return res?.data?.data || {};
            } catch (error) {
                handleApiError({
                    error,
                    throwError: true,
                    errorMessage: "Failed to search user",
                });
            }
        },

        staleTime: 1000 * 60 * 2,
    });
};