import { axiosPrivate } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
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
