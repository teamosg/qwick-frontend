import { toast } from "sonner";

const handleApiError = ({ error, errorMessage = "Network Error", throwError = false }) => {
    const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        errorMessage
    toast.error(message);
    if (throwError) throw new Error(message);
};

export default handleApiError;