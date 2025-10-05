# Auth API Implementation

This directory contains the complete authentication system implementation based on the Postman collection API endpoints.

## Structure

```
src/
├── schemas/
│   ├── auth.schema.js     # Zod validation schemas for auth
│   ├── index.js          # Schema exports
│   └── README.md         # This file
├── services/
│   ├── auth.api.js       # API service functions
│   └── index.js          # Service exports
├── hooks/
│   └── auth.hook.js      # React hooks for auth operations
└── lib/
    └── axios.config.js   # Axios configuration
```

## Features

### Authentication Endpoints
- ✅ Sign Up
- ✅ Sign In
- ✅ Verify OTP
- ✅ Logout
- ✅ Change Password
- ✅ Forgot Password
- ✅ Reset Password
- ✅ Delete Account

### Profile Management
- ✅ Get Profile
- ✅ Edit Profile (Avatar upload)
- ✅ Get Other User Profile

### Security Features
- ✅ Two Factor Authentication Status
- ✅ Enable/Disable Two Factor Authentication

## Usage Examples

### Sign Up
```javascript
import { useSignUp } from '../hooks/auth.hook.js';

const SignUpComponent = () => {
  const { form, mutate, isPending } = useSignUp();
  
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('first_name')} />
      <input {...form.register('last_name')} />
      <input {...form.register('email')} />
      <input {...form.register('password')} type="password" />
      <input {...form.register('confirm_password')} type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Sign Up'}
      </button>
    </form>
  );
};
```

### Sign In
```javascript
import { useSignIn } from '../hooks/auth.hook.js';

const SignInComponent = () => {
  const { form, mutate, isPending } = useSignIn();
  
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      <input {...form.register('password')} type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
```

### Profile Management
```javascript
import { useProfile, useEditProfile } from '../hooks/auth.hook.js';

const ProfileComponent = () => {
  const { data: profile, isLoading } = useProfile();
  const { form, mutate, isPending } = useEditProfile();
  
  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile?.data?.first_name} {profile?.data?.last_name}</p>
      <p>Email: {profile?.data?.email}</p>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input 
          type="file" 
          {...form.register('avatar')} 
          accept="image/*"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Avatar'}
        </button>
      </form>
    </div>
  );
};
```

### Two Factor Authentication
```javascript
import { useTwoFactorStatus, useToggleTwoFactor } from '../hooks/auth.hook.js';

const TwoFactorComponent = () => {
  const { data: status } = useTwoFactorStatus();
  const { form, mutate, isPending } = useToggleTwoFactor();
  
  const toggleTwoFactor = (action) => {
    mutate({ action });
  };

  return (
    <div>
      <h2>Two Factor Authentication</h2>
      <p>Status: {status?.data?.two_factor_enabled ? 'Enabled' : 'Disabled'}</p>
      
      <button 
        onClick={() => toggleTwoFactor(
          status?.data?.two_factor_enabled ? 'disable' : 'enable'
        )}
        disabled={isPending}
      >
        {isPending ? 'Updating...' : 
         status?.data?.two_factor_enabled ? 'Disable' : 'Enable'} 2FA
      </button>
    </div>
  );
};
```

## Environment Variables

Make sure to set the following environment variable in your `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Token Management

The implementation includes automatic token management:

- Tokens are automatically stored in localStorage upon successful authentication
- Tokens are automatically included in authenticated requests
- Tokens are automatically cleared upon logout
- The `tokenUtils` object provides utility functions for token management

## Error Handling

All hooks include comprehensive error handling:

- Form validation errors are displayed on the respective fields
- API errors are displayed as toast notifications
- Network errors are handled gracefully

## Schema Validation

All forms use Zod schemas for validation:

- Real-time validation feedback
- Type-safe form handling
- Consistent error messages
- Password confirmation validation

## API Response Format

All API responses follow this format:

```javascript
{
  status: boolean,
  message: string,
  data?: object,
  token?: string,
  refresh?: string
}
```

## Dependencies

- `zod` - Schema validation
- `@hookform/resolvers` - React Hook Form integration with Zod
- `@tanstack/react-query` - Data fetching and caching
- `react-hook-form` - Form management
- `react-hot-toast` - Toast notifications
- `axios` - HTTP client


