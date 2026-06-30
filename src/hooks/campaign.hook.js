import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { toast } from "sonner";

export const useGetAllCampaigns = () => {
    return useQuery({
        queryKey: ["allCampaigns"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/campaigns/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch campaigns" });
            }
        },
        staleTime: 1000 * 60 * 2, // cache for 2 mins
    });
};

export const useGetSingleCampaign = (campaignId) => {
    return useQuery({
        queryKey: ["singleCampaign", campaignId],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get(`/v1/campaigns/${campaignId}/`);
                return res?.data?.campaign;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch campaign" });
            }
        },
        enabled: !!campaignId,
        staleTime: 1000 * 60 * 2, // cache for 2 mins
    });
};


export const useCreateCampaign = (communityId, setAlert) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createCampaign", communityId],
        mutationFn: async (payload) => {
            // payload should be FormData if it contains files
            const res = await axiosPrivate.post(
                `/v1/${communityId}/campaign/create/`,
                payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data?.message || "Campaign created successfully");
                if (setAlert) setAlert({ type: "success", message: data.message });
                queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
            } else {
            toast.error(data?.message || "Failed to create campaign");
            if(setAlert) setAlert({
                type: "error",
                message: data.message || "Failed to create campaign",
            errors: data.details || null
        });
}
        },
onError: (error) => {
    const errorData = error?.response?.data;
    if (setAlert && errorData) {
        setAlert({
            type: "error",
            message: errorData.message || "Invalid Data",
            errors: errorData.details || null
        });
    }
    handleApiError({ error, errorMessage: "Failed to create campaign" });
},
    });
};



export const useSubmitCampaignContent = (campaignId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["submitCampaignContent", campaignId],
        mutationFn: async (payload) => {
            // payload should be FormData: file, tiktok_link, youtube_link, instagram_link
            const res = await axiosPrivate.post(
                `/v1/campaign/${campaignId}/content/submit/`,
                payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success || data?.status === 200 || data?.status === 201) {
                toast.success(data?.message || "Content submitted successfully");
                queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
            } else {
                toast.error(data?.message || "Failed to submit content");
            }
        },
        onError: (error) => { handleApiError({ error, errorMessage: "Failed to submit content" }); },
    });
};

export const useGetMySubmissions = () => {
    return useQuery({
        queryKey: ["mySubmissions"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/my-submissions/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch submissions" });
            }
        },
        staleTime: 1000 * 60 * 2,
    });
};

export const useGetCommunitySubmissions = (communityId) => {
    return useQuery({
        queryKey: ["communitySubmissions", communityId],
        queryFn: async () => {
            if (!communityId) return null;
            try {
                const res = await axiosPrivate.get(`/v1/communities/${communityId}/submissions/`);
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch community submissions" });
            }
        },
        enabled: !!communityId,
    });
};

export const useReviewSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ submissionId, action, feedback }) => {
            const payload = { action };
            if (feedback?.trim()) {
                payload.feedback = feedback.trim();
            }
            const res = await axiosPrivate.post(`/v1/${submissionId}/content/approve/`, payload);
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success || data?.status === 200) {
                toast.success(data?.message || "Submission reviewed successfully");
                queryClient.invalidateQueries({ queryKey: ["communitySubmissions"] });
            } else {
                toast.error(data?.message || "Failed to review submission");
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to review submission" });
        },
    });
};

export const useUpdateCampaign = (campaignId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["updateCampaign", campaignId],
        mutationFn: async (payload) => {
            const res = await axiosPrivate.patch(
                `/v1/campaigns/${campaignId}/update/`,
                payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data?.message || "Campaign updated successfully");
                queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
                queryClient.invalidateQueries({ queryKey: ["singleCampaign", campaignId] });
            } else {
                toast.error(data?.message || "Failed to update campaign");
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to update campaign" });
        },
    });
};

export const useGetCampaignTypes = () => {
    return useQuery({
        queryKey: ["campaignTypes"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/campaign-types/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch campaign types" });
            }
        },
        staleTime: 1000 * 60 * 10, // 10 mins
    });
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const res = await axiosPrivate.get("/v1/categories/");
                return res?.data;
            } catch (error) {
                handleApiError({ error, throwError: true, errorMessage: "Failed to fetch categories" });
            }
        },
        staleTime: 1000 * 60 * 10, // 10 mins
    });
};

export const useExtendCampaign = (campaignId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["extendCampaign", campaignId],
        mutationFn: async (payload) => {
            const res = await axiosPrivate.post(
                `/v1/campaigns/${campaignId}/extend/`,
                payload
            );
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success || data?.status === 200) {
                toast.success(data?.message || "Campaign extended successfully");
                queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
                queryClient.invalidateQueries({ queryKey: ["singleCampaign", campaignId] });

                if (data?.data?.checkout_url) {
                    window.location.href = data.data.checkout_url;
                }
            } else {
                toast.error(data?.message || "Failed to extend campaign");
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to extend campaign" });
        },
    });
};

export const useWithdrawCampaign = (campaignId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["withdrawCampaign", campaignId],
        mutationFn: async () => {
            const res = await axiosPrivate.post(`/v1/campaigns/${campaignId}/withdraw/`);
            return res?.data;
        },
        onSuccess: (data) => {
            if (data?.success || data?.status === 200) {
                toast.success(data?.message || "Remaining balance withdrawn successfully");
                queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
                queryClient.invalidateQueries({ queryKey: ["singleCampaign", campaignId] });
            } else {
                toast.error(data?.message || "Failed to withdraw balance");
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to withdraw balance" });
        },
    });
};
