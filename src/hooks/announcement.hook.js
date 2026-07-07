import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useGetSavedAnnouncements = () => {
    return useQuery({
        queryKey: ["savedAnnouncements"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(`/v1/announcements/saved/`);
                return res?.data?.data || [];
            } catch (error) {
                handleApiError({
                    error,
                    throwError: true,
                    errorMessage: "Failed to fetch saved announcements"
                })
            }
        },
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
                queryClient.invalidateQueries({ queryKey: ["feed",] })
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



export const useFeed = () => {
    return useQuery({
        queryKey: ["feed"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(
                    `/v1/feed/`
                );
                return res?.data || [];
            } catch (error) {
                handleApiError({
                    error,
                    throwError: true,
                    errorMessage: "Failed to fetch feed"
                });
            }
        },
        staleTime: 1000 * 60 * 2,
    });
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
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
            }
        },
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
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
            }
        }
    })
}

// Hook for saving an announcement
export const useSaveAnnouncement = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => {
            const res = await axiosPrivate.post(`/v1/announcement/${id}/save-toggle/`);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
                queryClient.invalidateQueries({ queryKey: ["savedAnnouncements",] })
            }
        },
    })
}

// Hook for unsaving an announcement
export const useUnsaveAnnouncement = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => {
            const res = await axiosPrivate.post(`/v1/announcement/${id}/save-toggle/`);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
                queryClient.invalidateQueries({ queryKey: ["savedAnnouncements",] })
            }
        },
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
                queryClient.invalidateQueries({ queryKey: ["feed",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to post comment"
                })
            }
        }
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ AnnouncementId, commentId }) => {
            const res = await axiosPrivate.delete(`/v1/announcements/${AnnouncementId}/comments/${commentId}/`);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                toast.success(data?.message || "Comment deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
                queryClient.invalidateQueries({ queryKey: ["savedAnnouncements",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to delete comment"
                })
            }
        }
    })
}


export const useUpdateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ AnnouncementId, commentId, payload }) => {
            const res = await axiosPrivate.put(`/v1/announcements/${AnnouncementId}/comments/${commentId}/`, payload);
            return res?.data;
        },
        onSuccess: data => {
            if (data?.success) {
                toast.success(data?.message || "Comment updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["announcementsList",] })
                queryClient.invalidateQueries({ queryKey: ["feed",] })
                queryClient.invalidateQueries({ queryKey: ["savedAnnouncements",] })
            } else {
                handleApiError({
                    error: data,
                    errorMessage: "Failed to update comment"
                })
            }
        }
    })
}