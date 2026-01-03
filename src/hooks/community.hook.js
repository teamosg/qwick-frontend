import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";




export const useCreateCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ business_name, country, category, subcategory }) => {
      const payload = { business_name, country, category, subcategory }
      const res = await axiosPrivate.post("/v1/communities/", payload)
      return res?.data || {}
    },

    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Community created successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
        queryClient.invalidateQueries({ queryKey: ["myCommunityList"] });
      } else {
        toast.error(data?.message || "Failed to create community");
      }
    },

    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to create community" })
    }
  })
}




export const useGetCommunityList = () => {
  return useQuery({
    queryKey: ["communityList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/communities/");
        return res?.data?.data || [];
      } catch (error) {
        handleApiError({ error, throwError: true, errorMessage: "Failed to fetch community list" })
      }
    },
    staleTime: 1000 * 60 * 2, // cache for 2 mins
  });
};


export const useGetMyCommunityList = () => {
  return useQuery({
    queryKey: ["myCommunityList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/me/communities/");
        return res?.data?.data || [];
      } catch (error) {
        handleApiError({ error, throwError: true, errorMessage: "Failed to fetch my community list" })
      }
    },
    staleTime: 1000 * 60 * 2, // cache for 2 mins
  });
};



export const useEditCommunity = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ communityUsername, payload }) => {
      const res = await axiosPrivate.patch(
        `/v1/communities/${communityUsername}/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res?.data;
    },

    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Community updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
        queryClient.invalidateQueries({ queryKey: ["myCommunityList"] });
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to update community" })
      }
    },

    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to update community" })
    },
  });

  return { mutate, isPending };
};


export const useJoinCommunity = () => {
  return useMutation({
    mutationFn: async ({ communityUsername }) => {
      const res = await axiosPrivate.post(
        `/v1/communities/${communityUsername}/join/`
      );
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Community joined successfully!");
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to join community" })
      }
    },

    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to join community" })
    },
  });
}




export const useGetCommunityUsers = (communityUsername) => {
  return useQuery({
    queryKey: ["communityUsers", communityUsername],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/communities/${communityUsername}/members/`

        );
        return res?.data || [];
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch community members"
        });
      }
    },
    enabled: !!communityUsername,
    staleTime: 1000 * 60 * 2,
  });
};



export const useApproveCommunityUser = (communityUsername) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, action }) => {
      const payload = { action }
      const res = await axiosPrivate.post(
        `/v1/communities/${communityUsername}/handle-member/${userId}/`, payload);
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "User approved successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityUsers", communityUsername] });
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to approve user" })
      }
    },

    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to approve user" })
    },
  });
}


export const useManageCommunityUserRole = (communityUsername) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, action }) => {
      const res = await axiosPrivate.post(
        `/v1/communities/${communityUsername}/${action}/${userId}/`);
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || `User role changed successfully!`);
        queryClient.invalidateQueries({ queryKey: ["communityUsers", communityUsername] });
      } else {
        handleApiError({ error: data?.message, errorMessage: `Failed to change user role` })
      }
    },

    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to change user role" })
    },
  });
}



export const useDeleteCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ communityUsername }) => {
      const res = await axiosPrivate.delete(
        `/v1/communities/${communityUsername}/`
      );
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Community deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
        queryClient.invalidateQueries({ queryKey: ["myCommunityList"] });
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to delete community" })
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to delete community" })
    },
  });
}



export const useGetCommunityEarnings = (communityId) => {
  return useQuery({
    queryKey: ["communityEarnings", communityId],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/community/${communityId}/earnings/`
        );
        return res?.data || [];
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch community earnings"
        });
      }
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetCommunityWithdrawals = (communityId) => {
  return useQuery({
    queryKey: ["communityWithdrawals", communityId],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/community/${communityId}/withdrawals/`
        );
        return res?.data || [];
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch community withdrawals"
        });
      }
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useApproveWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosPrivate.post(`/v1/withdraw/approve/${id}/`, {
        action: "approve",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Withdrawal approved successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityWithdrawals"] });
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to approve withdrawal" });
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to approve withdrawal" });
    },
  });
};

export const useRejectWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosPrivate.post(`/v1/withdraw/approve/${id}/`, {
        action: "reject",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Withdrawal rejected successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityWithdrawals"] });
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to reject withdrawal" });
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to reject withdrawal" });
    },
  });
};

export const useWithdrawal = (communityId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ amount }) => {
      const res = await axiosPrivate.post(`/v1/community/${communityId}/withdraw/`, { amount });
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Withdrawal request created successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityWithdrawals", communityId] });
      } else {
        toast.error(data?.message || "Failed to create withdrawal request");
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to create withdrawal request" });
    },
  });
};

export const useGetCampaignBudgets = (communityId) => {
  return useQuery({
    queryKey: ["campaignBudgets", communityId],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/communities/${communityId}/campaign-budgets/`
        );
        return res?.data;
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch campaign budgets",
        });
      }
    },
    enabled: !!communityId,
    staleTime: 1000 * 60 * 2,
  });
};
export const useGetCommunityCategories = () => {
  return useQuery({
    queryKey: ["communityCategories"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/communities/categories/");
        return res?.data?.data || [];
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch community categories",
        });
      }
    },
    staleTime: 1000 * 60 * 10, // cache for 10 mins
  });
};
export const useGetCommunityConversations = (communityUsername) => {
  return useQuery({
    queryKey: ["communityConversations", communityUsername],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(`/v1/community/conversations/${communityUsername}/`);
        return res?.data?.data || {};
      } catch (error) {
        handleApiError({
          error,
          throwError: true,
          errorMessage: "Failed to fetch conversations",
        });
      }
    },
    enabled: !!communityUsername,
    staleTime: 1000 * 30, // cache for 30 seconds for quick returns
  });
};
