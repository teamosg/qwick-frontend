import { axiosPrivate } from "@/lib/axios.config";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetCommunityList = () => {
  return useQuery({
    queryKey: ["communityList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/communities/");
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch community list";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 2, // cache for 2 mins
  });
};

export const useEditCommunity = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({communityUsername, payload}) => {
      const res = await axiosPrivate.patch(
        `/v1/communities/${communityUsername}/`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Community updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
      } else {
        toast.error(data?.message || "Failed to update community");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to update community";
      toast.error(message);
    },
  });

  return { mutate, isPending };
};
