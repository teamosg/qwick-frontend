import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useQuery } from "@tanstack/react-query";

export const useGetAnnouncementsList = (communityUsername) => {
    return useQuery({
        queryKey: ["announcementsList", communityUsername],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(`/v1/${communityUsername}/announcements/`);
                return res?.data?.data || [];
            } catch (error) {
                handleApiError({
                    error,
                    throwError: true,
                    errorMessage: "Failed to fetch announcements list"
                })
            }
        },
        enabled: !!communityUsername,
        staleTime: 1000 * 60 * 2,
    })
}