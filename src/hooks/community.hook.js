import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";




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
          `/v1/communities/pythondjangoolovers/members/`

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