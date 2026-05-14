/**
 * Utility for username validation and formatting.
 * Enforces:
 * - Lowercase only
 * - Numbers, dots, and underscores allowed
 * - No other special characters or spaces
 */

export const formatUsername = (username) => {
  if (!username) return "";
  return username.toLowerCase().replace(/[^a-z0-9._]/g, "");
};

export const isValidUsername = (username) => {
  const regex = /^[a-z0-9._]+$/;
  return regex.test(username);
};

export const usernameValidationMessage = "Username can only contain lowercase letters, numbers, dots, and underscores.";
