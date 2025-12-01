import { axiosPrivate } from "@/lib/axios.config";
import handleApiError from "@/services/handleApiError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetRequestConversationList = () => {
  return useQuery({
    queryKey: ["requestConversationList"],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("/v1/account/message-requests/");
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
    staleTime: 1000 * 60 * 10,
  });
};

export const usePinConversation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ conversationId }) => {
      try {
        const res = await axiosPrivate.post(
          `/v1/account/pin/${conversationId}/`
        );
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to pin conversation";
        toast.error(message);
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success("Conversation pinned successfully");
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      } else {
        toast.error("Failed to pin conversation");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to pin conversation";
      toast.error(message);
    },
  });

  return { mutate, isPending };
};

export const useUnpinConversation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ conversationId }) => {
      try {
        const res = await axiosPrivate.delete(
          `/v1/account/pin/${conversationId}/`
        );
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to un-pin conversation";
        toast.error(message);
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success("Conversation un-pinned successfully");
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      } else {
        toast.error("Failed to un-pin conversation");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to un-pin conversation";
      toast.error(message);
    },
  });

  return { mutate, isPending };
};

export const useGetConversationDetails = ({ type, conversationId }) => {
  return useQuery({
    queryKey: ["conversationDetails", conversationId],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/account/conversations/${type}/${conversationId}/`
        );
        return res?.data?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to fetch conversation details";

        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useGetGroupConversationDetails = ({ type, conversationId }) => {
  return useQuery({
    queryKey: ["conversationDetails", conversationId],
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `/v1/account/conversations/${type}/${conversationId}/`
        );
        return res?.data || [];
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to fetch conversation details";

        toast.error(message);
        throw new Error(message);
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useConversationRequestAction = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ action, conversationId }) => {
      const payload = { action };

      try {
        const res = await axiosPrivate.patch(
          `/v1/account/message-requests/${conversationId}/`,
          payload
        );
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message ||
          "Failed to un-pin conversation";

        toast.error(message);
        throw new Error(message);
      }
    },

    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["requestConversationList"],
        });
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
        queryClient.invalidateQueries({ queryKey: ["conversationDetails"] });
      } else {
        toast.error(data?.message || "Failed to action conversation request");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to update profile";
      toast.error(message);
    },
  });
  return { mutateAsync, isPending };
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, }) => {
      try {
        const res = await axiosPrivate.post(`/v1/account/block/${userId}/`);
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to block user";
        toast.error(message);
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success("User blocked successfully");
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      } else {
        toast.error("Failed to block user");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to block user";
      toast.error(message);
    },
  });
};



export const useUnBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, }) => {
      try {
        const res = await axiosPrivate.post(`/v1/account/block/${userId}/`);
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to un-block user";
        toast.error(message);
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success("User un-blocked successfully");
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      } else {
        toast.error("Failed to un-block user");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to un-block user";
      toast.error(message);
    },
  });
};

export const useCreateConversationGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, members }) => {
      try {
        const res = await axiosPrivate.post("/v1/account/groups/create/", {
          name,
          members,
        });
        return res?.data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to create conversation group";
        toast.error(message);
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Conversation group created successfully");
        queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      } else {
        toast.error(data?.message || "Failed to create conversation group");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create conversation group";

      throw new Error(message);
    },
  });
};



export const useAddMemberToGroup = () => {
  return useMutation({
    mutationFn: async ({ groupId, members }) => {
      const payload = { members }
      const res = await axiosPrivate.post(`/v1/account/groups/${groupId}/add-members/`, payload)
      return res?.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        handleApiError({ error: data?.message, errorMessage: "Failed to add member to group" })
      }
    },
    onError: (error) => {
      handleApiError({ error, errorMessage: "Failed to add member to group" })
    }
  })
}