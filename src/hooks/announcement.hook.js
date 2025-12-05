import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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



export const useCreateAnnouncements = (communityUsername) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload) => {
            const res = await axiosPrivate.post(`/v1/${communityUsername}/announcements/`, payload, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            return res?.data;
        },
        onSuccess: data => {
            if (data?.status) {
                toast.success(data?.message || "Announcement created successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList", communityUsername] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to create announcement"
                })
            }
        },
        onError: data => {
            handleApiError({
                error: data,
                errorMessage: "Failed to create announcement"
            })
        }
    })
}



export const useLikeAnnouncement = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => {
            const res = await axiosPrivate.post(`/v1/announcements/${id}/like/`);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.status) {
                toast.success(data?.message || "Announcement liked successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to like announcement"
                })
            }
        },
        onError: data => {
            handleApiError({
                error: data,
                errorMessage: "Failed to like announcement"
            })
        }
    })
}


export const useDislikeAnnouncement = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => {
            const res = await axiosPrivate.delete(`/v1/announcements/${id}/like/`);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                toast.success(data?.message || "Announcement disliked successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to dislike announcement"
                })
            }
        }
    })
}




export const useComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ AnnouncementId, payload }) => {
            const res = await axiosPrivate.post(`/v1/announcements/${AnnouncementId}/comments/`, payload);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                toast.success(data?.message || "Comment posted successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to post comment"
                })
            }
        }
    })
}