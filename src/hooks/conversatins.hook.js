import { axiosPrivate } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetConversationList = () => {
  return useQuery({
    queryKey: ["conversationList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/account/conversations/");
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch conversation list";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 10, // cache for 10 mins
  });
};

export const useGetRequestConversationList = () => {
  return useQuery({
    queryKey: ["requestConversationList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          "/v1/account/message-requests/"
        );
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch request conversation list";
        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 10, // cache for 10 mins
  });
};
