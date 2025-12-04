import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useQuery } from "@tanstack/react-query"

export const useGetOtherUser = () => {
    return useQuery({
        queryKey: ["otherUser"],
        queryFn: async ({ userName }) => {
            try {
                const res = await axiosPrivate.get(`/v1/account/profile/${userName}/`);
                return res?.data?.data || {};
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch other user" })
            }
        },
        staleTime: 1000 * 60 * 2,
    })
}