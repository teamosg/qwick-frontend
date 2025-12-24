import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { toast } from "sonner";

export const useCreateCampaign = (communityId) => {
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
                // Invalidate relevant queries if needed, e.g., fetching campaigns list
                // queryClient.invalidateQueries({ queryKey: ["campaigns", communityId] });
            } else {
                toast.error(data?.message || "Failed to create campaign");
            }
        },
        onError: (error) => {
            handleApiError({ error, errorMessage: "Failed to create campaign" });
        },
    });
};

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
