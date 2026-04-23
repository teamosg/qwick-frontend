import { z } from 'zod';

// Sign Up Schema
export const signUpSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  last_name: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters'),
  accepted_terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions")
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Verify OTP Schema
export const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
  otp_type: z.enum(['account_verification', 'password_reset', 'two_factor'], {
    errorMap: () => ({ message: 'Invalid OTP type' })
  })
});

// Change Password Schema
export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters')
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters')
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Two Factor Enable/Disable Schema
export const twoFactorSchema = z.object({
  action: z.enum(['enable', 'disable'], {
    errorMap: () => ({ message: 'Action must be either enable or disable' })
  })
});

// Delete Account Schema
export const deleteAccountSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits')
});

// Profile Edit Schema (for avatar upload)
export const profileEditSchema = z.object({
  avatar: z.instanceof(File).optional()
});

// Response Schemas
export const authResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
  refresh: z.string().optional(),
  data: z.object({
    id: z.number(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().optional(),
    avatar: z.string().optional(),
    is_verified: z.boolean().optional(),
    two_factor_enabled: z.boolean().optional()
  }).optional()
});

export const profileResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    username: z.string().optional(),
    avatar: z.string().optional(),
    is_verified: z.boolean().optional(),
    two_factor_enabled: z.boolean().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
  }).optional()
});

export const twoFactorStatusResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.object({
    two_factor_enabled: z.boolean(),
    qr_code: z.string().optional(),
    backup_codes: z.array(z.string()).optional()
  }).optional()
});

// Type exports for TypeScript-like usage
export const authTypes = {
  signUp: signUpSchema,
  signIn: signInSchema,
  verifyOtp: verifyOtpSchema,
  changePassword: changePasswordSchema,
  forgotPassword: forgotPasswordSchema,
  resetPassword: resetPasswordSchema,
  twoFactor: twoFactorSchema,
  deleteAccount: deleteAccountSchema,
  profileEdit: profileEditSchema,
  authResponse: authResponseSchema,
  profileResponse: profileResponseSchema,
  twoFactorStatusResponse: twoFactorStatusResponseSchema
};


