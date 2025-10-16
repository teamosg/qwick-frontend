import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosPublic, axiosPrivate } from "../lib/axios.config.js";

// Import schemas
import {
  signUpSchema,
  signInSchema,
  verifyOtpSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  twoFactorSchema,
  deleteAccountSchema,
  profileEditSchema,
} from "../schemas/auth.schema.js";

// Sign Up Hook
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosPublic.post("/v1/account/signup/", userData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        const email = form.getValues("email");
        const otp = data?.otp;
        localStorage.setItem("signup_email", email); // save for verification
        localStorage.setItem("otp", otp);
        toast.success(
          data?.message ||
            "Account created successfully! Please verify your email."
        );
        navigate("/verify-account", {
          state: { email: form.getValues("email") },
        });
      } else {
        toast.error(data?.message || "Failed to create account");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to create account";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Sign In Hook
export const useSignIn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = params.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosPublic.post("/v1/account/login/", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Sign in successfully");
        const token = data?.access;
        localStorage.setItem("token", token);
        const user = data?.data;
        localStorage.setItem("user", JSON.stringify(user));

        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      } else {
        toast.error(data?.message || "Failed to sign in");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to sign in";

      // Handle email-specific error
      if (
        typeof message === "string" &&
        message.toLowerCase().includes("email")
      ) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// Verify OTP Hook
// export const useVerifyOtp = () => {
//   const navigate = useNavigate();

//   const form = useForm({
//     resolver: zodResolver(verifyOtpSchema),
//     defaultValues: {
//       email: "",
//       otp: "",
//       otp_type: "",
//     },
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: async (otpData) => {
//       const res = await axiosPublic.post("/v1/account/verify-otp/", otpData);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       if (data?.status) {
//         toast.success(data?.message || "Account verified successfully!");
//         localStorage.removeItem("signup_email"); // remove after success
//         navigate("/successfully-verified");
//       } else {
//         toast.error(data?.message || "Failed to verify account");
//       }
//     },
//     onError: (error) => {
//       const message =
//         error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         error.message ||
//         "Failed to verify account";
//       toast.error(message);
//     },
//   });

//   return { form, mutate, isPending };
// };

export const useVerifyOtp = (otpType = "account_verification") => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (otpData) => {
      const res = await axiosPublic.post("/v1/account/verify-otp/", otpData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "OTP verified successfully!");
        if (otpType === "account_verification") {
          localStorage.removeItem("signup_email");
          navigate("/successfully-verified");
        }
        if (otpType === "password_reset") {
          navigate("/reset-password");
        }
      } else {
        toast.error(data?.message || "OTP verification failed");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "OTP verification failed";
      toast.error(message);
    },
  });

  return { mutate, isPending };
};

// Logout Hook
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refresh");
      const res = await axiosPrivate.post("/v1/account/logout/", {
        refresh: refreshToken,
      });
      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/sign-in");
    },
    onError: (error) => {
      // Even if logout fails on server, clear local tokens
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/sign-in");
    },
  });

  return { mutate, isPending };
};

// Change Password Hook
export const useChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (passwordData) => {
      const res = await axiosPrivate.post(
        "/v1/account/change-password/",
        passwordData
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Password changed successfully!");
        form.reset();
      } else {
        toast.error(data?.message || "Failed to change password");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to change password";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Forgot Password Hook
export const useForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/v1/account/forgot-password/", {
        email: data.email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Password reset email sent!");
        form.reset();
      } else {
        toast.error(data?.message || "Failed to send reset email");
      }
      navigate("/enter-otp", { state: { email: data.email } });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to send reset email";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Reset Password Hook
export const useResetPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (resetData) => {
      const res = await axiosPublic.post(
        "/v1/account/reset-password/",
        resetData
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Password reset successfully!");
        navigate("/sign-in");
      } else {
        toast.error(data?.message || "Failed to reset password");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to reset password";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Profile Hook
export const useProfile = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/v1/account/profile/");
      return res?.data?.data;
    },
    enabled: isAuthenticated,
  });
};

// Edit Profile Hook
export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosPrivate.put("/v1/account/profile/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Profile updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        form.reset();
      } else {
        toast.error(data?.message || "Failed to update profile");
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

  return { form, mutate, isPending };
};

// Two Factor Status Hook
export const useTwoFactorStatus = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return useQuery({
    queryKey: ["twoFactorStatus"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/v1/account/two-factor-status/");
      return res.data;
    },
    enabled: isAuthenticated,
  });
};

// Toggle Two Factor Hook
export const useToggleTwoFactor = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      action: "enable",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPrivate.post("/v1/account/two-factor-enable/", {
        action: data.action,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Two factor authentication updated!");
        queryClient.invalidateQueries({ queryKey: ["twoFactorStatus"] });
      } else {
        toast.error(
          data?.message || "Failed to update two factor authentication"
        );
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to update two factor authentication";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Delete Account Hook
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (deleteData) => {
      const res = await axiosPrivate.delete("/v1/account/delete-account/", {
        data: deleteData,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Account deleted successfully!");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        queryClient.clear();
        navigate("/signin");
      } else {
        toast.error(data?.message || "Failed to delete account");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to delete account";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};
