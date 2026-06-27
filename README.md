# 🚀 QWick Platform

> **A community-driven marketing & campaign platform connecting brands with creators.**  
> Launch viral campaigns, earn from your influence, and grow your presence across TikTok, Instagram, and YouTube.

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Authentication & Security](#-authentication--security)
  - [Auth Flow](#auth-flow)
  - [Security Features](#security-features)
- [👥 Communities](#-communities)
- [📢 Announcements](#-announcements)
- [💬 Messaging](#-messaging)
- [📦 Content Rewards & Campaigns](#-content-rewards--campaigns)
- [💳 Payments & Wallet](#-payments--wallet)
- [📊 Analytics & Dashboard](#-analytics--dashboard)
- [🔔 Notifications](#-notifications)
- [📄 Pages & Routes](#-pages--routes)
- [🧩 Components & UI Library](#-components--ui-library)
- [📦 Custom Hooks](#-custom-hooks)
- [🧠 State Management](#-state-management)
- [🎨 Theming](#-theming)
- [🌐 API Integration](#-api-integration)
- [📜 Scripts](#-scripts)
- [🧪 ESLint & Code Quality](#-eslint--code-quality)
- [🤝 Contributing](#-contributing)

---

## ✨ Overview

**QWick** is an all-in-one platform that enables:

- 🏢 **Brands** to create communities, launch content reward campaigns, manage payouts, and grow their marketing reach.
- 🎨 **Creators** to discover campaigns, submit content, earn rewards, and build their portfolio.
- 💬 **Real-time communication** through direct messaging, group chats, and community chat rooms.
- 📢 **Announcements** with social engagement features (likes, comments, saves).

---

## 🛠 Tech Stack

### Frontend Framework & Build

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| **React 19**    | UI library                       |
| **Vite 7**      | Build tool & dev server           |
| **Tailwind CSS 4** | Utility-first CSS framework   |
| **ESLint 9**    | Code linting                     |

### UI & Components

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **ShadCN UI**          | Component library (Radix UI based)    |
| **Radix UI**           | Accessible headless UI primitives     |
| **Lucide React**       | Icon library                         |
| **Framer Motion**      | Animation library                    |
| **AOS**                | Animate on scroll                    |
| **Lenis**              | Smooth scrolling                     |
| **Vaul**               | Drawer component                     |
| **cmdk**               | Command menu                         |
| **Emoji Picker React** | Emoji selection                      |
| **react-dropzone**     | File uploads                         |
| **react-phone-input-2** | Phone number input                 |
| **yet-another-react-lightbox** | Image lightbox               |

### Forms & Validation

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **React Hook Form**    | Form management                       |
| **Zod**                | Schema validation                     |
| **@hookform/resolvers** | Zod ↔ React Hook Form bridge        |

### State Management & Data Fetching

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **TanStack React Query 5** | Server state & caching           |
| **Zustand 5**          | Client state management               |

### Routing

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **React Router 7**     | Client-side routing & navigation      |

### HTTP & Real-time

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **Axios**              | HTTP client (public & private)        |
| **WebSocket**          | Real-time notifications               |

### Payments

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **Stripe**             | Payment processing, deposits, payouts |
| **react-stripe-js**    | Stripe React integration              |

### Authentication

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **@react-oauth/google** | Google OAuth sign-in                 |

### Charts & Data

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **Recharts**           | Data visualization & charts           |
| **date-fns**           | Date utility library                  |

### Notification

| Technology              | Purpose                               |
|-------------------------|---------------------------------------|
| **Sonner**             | Toast notifications                   |

---

## 📁 Project Structure

```
QWick/
├── public/                          # Static assets (logos, images)
│   ├── qwick_logo.webp
│   ├── qwick_logo_solo.png
│   ├── logo.svg
│   ├── join-community.png
│   ├── confirm-apply.png
│   ├── submission.png
│   ├── communityBG.png
│   ├── dashboardProfile.png
│   └── media/                       # Additional media files
│
├── src/
│   ├── main.jsx                     # App entry point
│   ├── index.css                    # Tailwind + CSS variables + theme
│   │
│   ├── routes/
│   │   ├── router.jsx               # All route definitions
│   │   ├── PrivateRoute.jsx         # Auth guard wrapper
│   │   └── PublicRoute.jsx          # Public route wrapper
│   │
│   ├── layout/
│   │   ├── Layout.jsx               # Public layout (Navbar + Footer)
│   │   ├── AuthLayout.jsx           # Auth pages layout
│   │   └── DashboardLayout.jsx      # Dashboard layout (Sidebar + Header)
│   │
│   ├── pages/                       # Page-level components
│   │   ├── landing/
│   │   │   ├── Landing.jsx          # Landing page
│   │   │   └── components/          # Hero, CampaignDrops, SubmitClips,
│   │   │                            # EarningsSection, HowItWorks, FAQ, etc.
│   │   ├── auth/                    # SignIn, SignUp, ForgotPassword,
│   │   │                            # ResetPassword, VerifyAccount, 2FA, etc.
│   │   ├── dashboard/               # Home, Discover, Profile, JoinCommunity,
│   │   │                            # Apply, Dashboard, NotFound
│   │   ├── Message/                 # Direct & group messaging
│   │   ├── announcement/            # Announcements feed
│   │   ├── addcommunity/            # Community creation wizard
│   │   ├── discover/                # Campaign discovery & details
│   │   ├── notifications/           # Notifications list
│   │   ├── feedback/                # Feedback & reviews
│   │   ├── help/                    # Help & support pages
│   │   ├── deposit/                 # Deposit success
│   │   └── TermsAndConditions.jsx
│   │
│   ├── components/
│   │   ├── ui/                      # ShadCN UI primitives (button, card,
│   │   │                            # dialog, input, form, table, chart, etc.)
│   │   ├── shared/                  # ThemeProvider
│   │   ├── dashboard/               # Sidebar, Header, Cards, Profile,
│   │   │   ├── Sidebar/             #   Community sidebar components
│   │   │   ├── Home/                #   Post feed components
│   │   │   ├── Dashboard/           #   Dashboard management (ContentReward,
│   │   │   │                        #     Users, Payments, WaitList, Analytics)
│   │   │   ├── Explore/             #   Explore components
│   │   │   └── Profile/             #   Profile components
│   │   ├── messages/                # Chat UI components
│   │   ├── CommunityChat/           # Community chat rooms
│   │   ├── announcement/            # Announcement post/feed components
│   │   ├── contentReward/           # Content reward display & apply
│   │   ├── feedback/                # Review & rating components
│   │   ├── notifications/           # Notification items
│   │   ├── addCommunity/            # Community creation stepper
│   │   ├── discover/                # Campaign progress, filters, pagination
│   │   ├── Alerts/                  # Reusable alert components
│   │   ├── Logo/                    # Logo components
│   │   ├── tableColumns/            # Table column definitions
│   │   ├── skeletons/               # Loading skeletons
│   │   ├── dataTable/               # Data table component
│   │   └── index.js                 # Component exports
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── auth.hook.js             # Sign in, sign up, OTP, profile, password
│   │   ├── community.hook.js        # CRUD, join, members, roles, earnings
│   │   ├── campaign.hook.js         # Campaign CRUD, submissions, reviews
│   │   ├── conversations.hook.js    # Chat, groups, pin, block, requests
│   │   ├── announcement.hook.js     # Announcements, comments, likes, saves
│   │   ├── notification.hook.js     # Notifications & settings
│   │   ├── payment.hook.js          # Wallet, deposits, withdrawals, Stripe
│   │   ├── earnings.hook.js         # Creator earnings & withdrawals
│   │   ├── social.hook.js           # Social media account verification
│   │   ├── settings.hook.js         # Website settings
│   │   ├── users.hook.js            # User search
│   │   └── use-mobile.js            # Responsive detection
│   │
│   ├── store/                       # Zustand stores
│   │   ├── communityStore.js        # Community selection & lists
│   │   ├── conversationStore.js     # Chat conversations cache
│   │   └── notificationStore.js     # Unread notification state
│   │
│   ├── lib/
│   │   ├── utils.js                 # cn() utility + format helpers
│   │   ├── axios.config.js          # Axios instances (public + private)
│   │   └── formatFileSize.js        # File size formatter
│   │
│   ├── schemas/
│   │   ├── index.js                 # Schema exports
│   │   └── auth.schema.js           # Zod schemas for all auth forms
│   │
│   ├── services/
│   │   ├── handleApiError.js        # Centralized API error handler
│   │   └── clearLocalstore.js       # Auth data cleanup
│   │
│   ├── utils/
│   │   └── usernameUtils.js         # Username formatting & validation
│   │
│   ├── providers/
│   │   └── NotificationProvider.jsx # WebSocket notification provider
│   │
│   ├── data/
│   │   ├── countriesData.js         # Country list for community setup
│   │   └── mySubmissions.js         # Sample submissions data
│   │
│   ├── assets/
│   │   └── svg/                     # Custom SVG icons (social media,
│   │                                #   categories, navigation, etc.)
│   │
│   └── dummyData/
│       └── chat.js                  # Mock chat data
│
├── components.json                  # ShadCN configuration
├── vite.config.js                   # Vite + Tailwind + path aliases
├── eslint.config.js                 # ESLint flat config
├── jsconfig.json                    # Path alias config
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
└── vercel.json                      # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** (or **pnpm** / **bun**)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/qwick.git
cd qwick

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Base URL
VITE_API_BASE_URL=https://api.qwick.com

# Media Base URL
VITE_MEDIA_BASE_URL=https://media.qwick.com

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## 🔐 Authentication & Security

### Auth Flow

QWick implements a comprehensive authentication system with multiple verification layers:

```
                    ┌──────────────────┐
                    │    Landing Page   │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   Sign Up / In   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
     │ Email/Password│ │  Google  │ │  2FA Login  │
     └────────┬──────┘ └────┬─────┘ └──────┬──────┘
              │             │              │
     ┌────────▼──────┐      │              │
     │ OTP Verify    │◄─────┘              │
     │ (Email)       │                     │
     └────────┬──────┘                     │
              │                            │
     ┌────────▼──────┐                     │
     │   Verified    │◄────────────────────┘
     └────────┬──────┘
              │
     ┌────────▼─────────┐
     │  Dashboard/Home  │
     └──────────────────┘
```

### Security Features

| Feature                  | Description                                 |
|--------------------------|---------------------------------------------|
| **Google OAuth**        | One-click sign-in with Google               |
| **Email/Password Auth** | Traditional sign-up with JWT tokens         |
| **OTP Verification**    | Email-based OTP for account verification    |
| **Two-Factor Auth (2FA)** | QR code + backup codes for extra security |
| **Password Reset**      | Forgot password flow with email OTP         |
| **JWT Tokens**          | Access + Refresh token pair                 |
| **Auto-logout**         | Session expiry redirects to sign-in         |
| **Account Deletion**    | Full account removal with OTP confirmation  |
| **Social Media Verification** | Link TikTok, Instagram, YouTube accounts |

---

## 👥 Communities

Communities are the core organizational unit of QWick — they represent brands or groups that run campaigns.

### Community Features

| Feature                  | Description                                    |
|--------------------------|------------------------------------------------|
| **Create Community**     | Multi-step wizard with name, country, category |
| **Join Community**       | Direct join or approval-based waitlist         |
| **Community Categories** | Business, Medical, Social, Finance, Coaching,  |
|                          | E-commerce, Sales, Legal, Rental, etc.         |
| **User Roles**           | Admin, moderator, member management            |
| **Member Approval**      | Manual approval for waitlisted communities     |
| **Community Chat**       | Real-time group chat for community members     |
| **Delete Community**     | Full community removal (owner only)            |

### Community Categories

The platform supports a wide range of community categories, including:

🏢 Business &nbsp; | &nbsp; 🏥 Medical &nbsp; | &nbsp; 📱 Social Media &nbsp; | &nbsp; 💰 Finance  
🛒 E-commerce &nbsp; | &nbsp; 🎯 Coaching &nbsp; | &nbsp; 📊 Sales &nbsp; | &nbsp; ⚖️ Legal  
🏠 Rental &nbsp; | &nbsp; 🤖 AI &nbsp; | &nbsp; 🎨 Creative &nbsp; | &nbsp; 🎓 Education

---

## 📢 Announcements

A social-feed style feature for communities to share updates.

### Announcement Features

- **Create Posts** — Rich text, images, and content
- **Like/Unlike** — Toggle likes on announcements
- **Comments** — Nested comment threads with edit & delete
- **Save/Unsave** — Bookmark announcements for later
- **Feed** — Aggregated feed across joined communities
- **Image Uploads** — Multi-image support with preview
- **Image Lightbox** — Full-screen image viewer

---

## 💬 Messaging

Real-time communication system with direct and group messaging.

### Messaging Features

| Feature                | Description                               |
|------------------------|-------------------------------------------|
| **Direct Messages**    | One-on-one private conversations          |
| **Group Chats**        | Create groups with multiple members       |
| **Community Chat**     | Live chat rooms within communities        |
| **Message Requests**   | Accept/decline incoming message requests  |
| **Pin Conversations**  | Pin important chats to the top            |
| **Block/Unblock**      | Block unwanted users                      |
| **Add/Remove Members** | Group admin controls                      |
| **Leave Groups**       | Exit group conversations                  |
| **Media Sharing**      | Send images in chat                       |
| **Real-time Updates**  | Auto-refresh every 20 seconds             |

---

## 📦 Content Rewards & Campaigns

The core monetization feature — brands create campaigns, creators submit content, and get rewarded.

### Campaign Flow

```
Brand                        Creator
  │                            │
  ├─ Create Campaign           │
  │  (title, budget,           │
  │   requirements, dates)     │
  │                            │
  ├─ Set Payment               │
  │  (Stripe checkout)         │
  │                            │
  ├─ Launch ──────────────────►├─ Discover Campaign
  │                            │
  │                            ├─ Apply / Join
  │                            │
  │◄───────────────────────────├─ Submit Content
  │                            │  (video, links, etc.)
  │                            │
  ├─ Review Submission         │
  │  (approve / reject)        │
  │                            │
  ├─ Approve ─────────────────►├─ Reward Paid
  │                            │
  └─ Withdraw Remaining ──────►└─ Earnings Updated
```

### Campaign Features

| Feature                  | Description                                  |
|--------------------------|----------------------------------------------|
| **Create Campaign**      | Form with title, description, budget, dates  |
| **Multiple Campaigns**   | Run several campaigns per community           |
| **Campaign Types**       | Various reward structures                     |
| **Content Submission**   | Creators upload content with social links     |
| **Submission Review**    | Approve/reject with optional feedback         |
| **Campaign Extensions**  | Extend campaign duration with additional pay  |
| **Auto-join Toggle**     | Open or waitlist-based participation          |
| **Balance Withdrawal**   | Withdraw remaining campaign funds             |
| **Campaign Budgets**     | Track spending per campaign                   |
| **Payout Management**    | Approve/reject payout requests                |

---

## 💳 Payments & Wallet

Integrated payment system powered by **Stripe**.

### Payment Features

| Feature                   | Description                                 |
|---------------------------|---------------------------------------------|
| **Wallet Balance**        | Track available funds                       |
| **Deposit Funds**         | Add money via Stripe checkout               |
| **Withdraw Funds**        | Request withdrawals to bank account         |
| **Saved Payment Methods** | Store multiple payout methods               |
| **Stripe Connect**        | Onboarding for connected accounts           |
| **Multiple Currencies**   | International currency support              |
| **Transaction History**   | View all deposit & withdrawal records       |
| **Payout Processing**     | Admin approval for community payouts        |
| **Campaign Checkout**     | Pay for campaigns via Stripe                |

---

## 📊 Analytics & Dashboard

Community owners get detailed analytics and management tools.

### Dashboard Sections

| Section              | Purpose                                     |
|----------------------|---------------------------------------------|
| **Content Rewards**  | Manage campaigns, view submissions          |
| **All Submissions**  | Review & approve/reject creator content     |
| **Analytics**        | Charts & metrics on campaign performance    |
| **Users**            | Member list with role management            |
| **Wait List**        | Pending approval requests                   |
| **Payments**         | Wallet, deposits, withdrawals               |
| **Payout**           | Payout stats & transaction records          |
| **Automated Messages** | Auto-responder settings                   |
| **Dashboard Settings** | Community configuration & preferences     |
| **Notification Settings** | Notification preferences per community |

### Analytics Charts (Recharts)

- Campaign performance metrics
- Submission trends over time
- Budget utilization tracking
- Creator engagement statistics

---

## 🔔 Notifications

Real-time notification system powered by **WebSocket**.

### Notification Features

- **Real-time Delivery** — Instant notifications via WebSocket
- **Unread Badge** — Visual indicator for unread notifications
- **Toast Alerts** — In-app popup notifications
- **Notification Settings** — Per-category toggle controls
- **Notification History** — Full notification list

### Notification Types

| Type          | Description                             |
|---------------|-----------------------------------------|
| **New Message** | When someone sends you a message      |
| **Campaign Update** | Submission approved/rejected      |
| **Community Invite** | Invited to join a community       |
| **Approval Status** | Waitlist approval notifications     |
| **Payment Events** | Deposit confirmations, withdrawals   |

---

## 📄 Pages & Routes

### Public Routes

| Path                     | Component           | Description                  |
|--------------------------|---------------------|------------------------------|
| `/`                      | `Landing`           | Marketing landing page       |
| `/sign-in`               | `SignIn`            | User sign in                 |
| `/sign-up`               | `SignUp`            | User registration            |
| `/verify-account`        | `VerifyAccount`     | Email OTP verification       |
| `/verify-2fa`            | `VerifyTwoAuth`     | Two-factor authentication    |
| `/forgot-password`       | `ForgotPassword`    | Password reset request       |
| `/enter-otp`             | `ResetPasswordOtp`  | OTP entry for password reset |
| `/reset-password`        | `ResetPassword`     | New password creation        |
| `/successfully-verified` | `SuccessfullyVerified` | Verification success      |
| `/successfully-updated`  | `SuccessfullyUpdated` | Password update success    |
| `/terms-and-conditions`  | `TermsAndConditions` | Legal terms                 |
| `/deposit/success`       | `DepositSuccess`    | Deposit confirmation page    |

### Private (Authenticated) Routes

| Path                                      | Component             | Description                       |
|-------------------------------------------|-----------------------|-----------------------------------|
| `/home`                                   | `Home`                | Main feed page                    |
| `/discover`                               | `Discover`            | Browse campaigns                  |
| `/discover/:campaignId`                   | `CampaignDetails`     | Campaign detail view              |
| `/join-community/:communityUsername`      | `JoinCommunity`       | Join a community                  |
| `/messages`                               | `Message`             | Direct & group messaging          |
| `/addcommunity`                           | `AddCommunity`        | Create a new community            |
| `/announcement/:communityUsername`        | `AnnouncementFeed`    | Community announcements           |
| `/announcement/:communityUsername/content-reward` | `ContentRewordPublic` | Browse content rewards    |
| `/announcement/:communityUsername/content-reward/reward-details/:id` | `ContentRewardDetails` | Reward details |
| `/announcement/:communityUsername/community-chat` | `CommunityChat`     | Community chat room       |
| `/dashboard/:communityUsername`           | `DashboardContentReward` | Community dashboard          |
| `/dashboard/:communityUsername/all-submissions` | `MySubmissions`    | All content submissions     |
| `/dashboard/:communityUsername/analytics` | `Analytics`           | Campaign analytics              |
| `/dashboard/:communityUsername/users`     | `Users`               | Member management               |
| `/dashboard/:communityUsername/wait-list` | `WaitList`            | Pending approvals               |
| `/dashboard/:communityUsername/payments`  | `Payments`            | Wallet & transactions           |
| `/dashboard/:communityUsername/automated-message` | `AutomatedMessage` | Auto-responders           |
| `/dashboard/:communityUsername/dashboard-settings` | `DashboardSettings` | Community settings       |
| `/dashboard/:communityUsername/announcement` | `AnnouncementFeed`  | Dashboard announcements         |
| `/dashboard/:communityUsername/community-chat` | `CommunityChat`    | Dashboard community chat        |
| `/profile`                                | `Profile`             | User profile & settings          |
| `/notifications`                          | `Notifications`       | Notification list                |
| `/need-help`                              | `NeedHelp`            | Help & support                   |
| `/need-help/:category`                    | `DynamicHelpPage`     | Category-specific help           |
| `/feedback`                               | `Feedback`            | Submit platform feedback         |
| `*`                                       | `NotFound`            | 404 page                         |

---

## 🧩 Components & UI Library

### ShadCN UI Components

QWick uses **ShadCN UI** — a collection of beautifully designed, accessible React components built on **Radix UI** primitives.

| Component           | Description                        |
|---------------------|------------------------------------|
| `Button`            | Variants, sizes, loading states    |
| `Card`              | Content containers                 |
| `Dialog` / `AlertDialog` | Modal dialogs with overlay     |
| `Sheet`             | Slide-in panels (mobile sidebar)   |
| `Drawer`            | Bottom sheet (Vaul-based)          |
| `Form`              | Form field wrappers                |
| `Input` / `Textarea` | Text input fields                 |
| `Select` / `Command` | Dropdown & command menu           |
| `Checkbox`          | Checkbox input                     |
| `Tabs` / `Accordion` | Tab & accordion components        |
| `Table` / `DataTable` | Data display & sorting           |
| `Badge`             | Status indicators                  |
| `Avatar`            | User avatars with fallback         |
| `Tooltip`           | Hover tooltips                     |
| `Progress` / `Stepper` | Progress indicators             |
| `Skeleton`          | Loading placeholders               |
| `Spinner`           | Loading spinner                    |
| `Separator`         | Visual dividers                    |
| `Sidebar`           | Dashboard sidebar layout           |
| `ScrollArea`        | Custom scrollable containers       |
| `Label`             | Form labels                        |
| `Sonner`            | Toast notifications                |
| `Calendar` / `Popover` | Date picker & popovers          |
| `Chart`             | Recharts wrapper                   |
| `ModeToggle`        | Dark/light mode switcher           |
| `Collapsible`       | Expandable content sections        |
| `Alert`             | Status alerts (success, warning, etc.) |

---

## 📦 Custom Hooks

Each hook encapsulates API calls, state management, and side effects:

### `auth.hook.js`
- `useSignUp()` — Register with email/password
- `useSignIn()` — Login with JWT/token handling
- `useGoogleSignInHook()` — Google OAuth authentication
- `useVerifyOtp()` — OTP verification (account, password reset, 2FA)
- `useLogout()` — Logout with token refresh invalidation
- `useProfile()` — Fetch & cache user profile
- `useEditProfile()` — Update profile with avatar upload
- `useChangePassword()` — Change current password
- `useForgotPassword()` — Send password reset email
- `useResetPassword()` — Complete password reset
- `useResendOtp()` — Resend verification OTP
- `useDeleteAccount()` — Delete account with OTP confirmation
- `useTwoFactorStatus()` / `useGetTwoFactorStatus()` — 2FA status
- `useToggleTwoFactor()` — Enable/disable 2FA
- `useGetOtherUserProfile()` — Fetch other users' profiles

### `community.hook.js`
- `useCreateCommunity()` — Create new community
- `useGetCommunityList()` / `useGetMyCommunityList()` — List communities
- `useEditCommunity()` — Update community details
- `useJoinCommunity()` — Join a community
- `useDeleteCommunity()` — Delete owned community
- `useGetCommunityUsers()` — List community members
- `useApproveCommunityUser()` — Approve/reject join requests
- `useManageCommunityUserRole()` — Change user roles
- `useGetCommunityEarnings()` — Community earning stats
- `useGetCommunityWithdrawals()` — Withdrawal requests
- `useApproveWithdrawal()` / `useRejectWithdrawal()` — Handle withdrawals
- `useWithdrawal()` — Request withdrawal
- `useGetCampaignBudgets()` — Campaign budget data
- `useGetCommunityCategories()` — Available categories
- `useGetCommunityConversations()` — Community chat messages
- `useGetCommunityByUsername()` — Single community details

### `campaign.hook.js`
- `useGetAllCampaigns()` / `useGetSingleCampaign()` — Campaign CRUD
- `useCreateCampaign()` — Create with Stripe checkout redirect
- `useSubmitCampaignContent()` — Submit content to campaign
- `useGetMySubmissions()` / `useGetCommunitySubmissions()` — Submissions
- `useReviewSubmission()` — Approve/reject with feedback
- `useUpdateCampaign()` — Edit campaign details
- `useGetCampaignTypes()` / `useGetCategories()` — Metadata
- `useExtendCampaign()` — Extend with additional payment
- `useWithdrawCampaign()` — Withdraw remaining balance

### `conversations.hook.js`
- `useGetConversationList()` / `useGetRequestConversationList()` — Lists
- `usePinConversation()` / `useUnpinConversation()` — Pin management
- `useGetConversationDetails()` / `useGetGroupConversationDetails()` — Details
- `useConversationRequestAction()` — Accept/decline message requests
- `useBlockUser()` / `useUnBlockUser()` — User blocking
- `useCreateConversationGroup()` — Create group chats
- `useAddMemberToGroup()` / `useUpdateGroup()` — Group management
- `useLeaveGroup()` — Exit group conversations

### `announcement.hook.js`
- `useGetAnnouncementsList()` / `useGetSavedAnnouncements()` — Lists
- `useCreateAnnouncements()` — Create with image upload
- `useFeed()` — Aggregated feed across communities
- `useLikeAnnouncement()` / `useDislikeAnnouncement()` — Likes
- `useSaveAnnouncement()` / `useUnsaveAnnouncement()` — Saves
- `useComment()` / `useDeleteComment()` / `useUpdateComment()` — Comments

### `payment.hook.js`
- `useGetWalletBalance()` — Current wallet balance
- `useWithdrawTransactions()` / `useGetDepositTransactions()` — Transactions
- `useAddPaymentMethod()` — Stripe Connect onboarding
- `useDeposit()` — Add funds via Stripe checkout
- `useWithdraw()` / `useProcessWithdrawal()` — Withdraw funds
- `useGetCurrencies()` — Available currencies
- `useGetSavedMethods()` / `useDeleteSavedMethod()` — Payment methods

### `notification.hook.js`
- `useGetNotifications()` — Fetch notification list
- `useGetNotificationSettings()` — Notification preferences
- `useUpdateNotificationSettings()` — Update notification toggles

### `earnings.hook.js`
- `useGetMyEarnings()` — Creator earnings overview
- `useGetMyWithdrawals()` — Creator withdrawal history

### `social.hook.js`
- `useAddSocialMedia()` — Send OTP for social account linking
- `useVerifySocialMedia()` — Verify social media account

### `users.hook.js`
- `useGetOtherUser()` — Search & fetch user profiles

### `settings.hook.js`
- `useGetWebsiteSettings()` — Fetch website-wide settings

### Misc
- `use-mobile.js` — Responsive breakpoint detection

---

## 🧠 State Management

### Zustand Stores

| Store                    | Purpose                                  |
|--------------------------|------------------------------------------|
| `communityStore`         | Selected communities & community lists   |
| `conversationStore`      | Cached conversation list                 |
| `notificationStore`      | Unread notification flag                 |

### TanStack React Query

All server state is managed through **TanStack React Query v5**:

- **Automatic caching** with configurable `staleTime`
- **Automatic refetching** on window focus
- **Optimistic updates** for likes, saves, pins
- **Query invalidation** on mutations (e.g., new announcement triggers feed refresh)
- **Polling** for real-time-ish data (messaging: 20s intervals)

---

## 🎨 Theming

### Color System

QWick uses a custom **CSS variable-based theme system** with:

- **Light mode** (default) — Clean white/light gray backgrounds
- **Dark mode** — Dark backgrounds with adjusted contrast
- **System mode** — Follows OS preference

### Brand Colors

| Token          | Light Mode | Dark Mode   |
|----------------|------------|-------------|
| Primary        | `#F62B36`  | `#F62B36`   |
| Primary Hover  | `#C20C17`  | `#C20C17`   |
| Background     | `#F5F5F5`  | `oklch(0.145 0 0)` |
| Surface        | `#FFFFFF`  | `oklch(0.205 0 0)` |
| Foreground     | `#1F242F`  | `oklch(0.985 0 0)` |

### Typography

| Font            | Usage           |
|-----------------|-----------------|
| **Inter**       | Primary UI text |
| **Space Grotesk** | Display/Heading |
| **Silkscreen**  | Decorative      |

---

## 🌐 API Integration

### Axios Configuration

Two Axios instances handle API communication:

- **`axiosPublic`** — Unauthenticated endpoints (sign up, sign in, forgot password)
- **`axiosPrivate`** — Authenticated endpoints (auto-attaches `Bearer` token, handles 401 auto-redirect)

### API Base URL

Configured via environment variable: `VITE_API_BASE_URL`

### Error Handling

Centralized error handler (`handleApiError.js`) provides consistent error messages via **Sonner** toast notifications across all API calls.

### WebSocket Connection

Real-time notifications established at app mount:

```
wss://{host}/ws/notifications/?token={jwt_token}
```

---

## 📜 Scripts

| Script            | Command                    | Description              |
|-------------------|----------------------------|--------------------------|
| `dev`             | `npm run dev`              | Start dev server         |
| `build`           | `npm run build`            | Production build         |
| `preview`         | `npm run preview`          | Preview production build |
| `lint`            | `npm run lint`             | Run ESLint               |

---

## 🧪 ESLint & Code Quality

The project uses **ESLint 9** with flat config:

- **`eslint-plugin-react-hooks`** — Enforce Rules of Hooks
- **`eslint-plugin-react-refresh`** — Fast refresh compatibility
- **`globals`** — Browser environment globals

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Commit changes**: `git commit -m 'Add some feature'`
4. **Push**: `git push origin feature/my-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code patterns and component structure
- Use **Zod schemas** for form validation
- Create **custom hooks** for all API interactions
- Leverage **TanStack Query** for server state
- Use **Zustand** only for truly global client state
- Follow **ShadCN** conventions for UI components
- Keep components focused and single-responsibility
- Add **PropTypes** for component props documentation

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

<div align="center">
  <p>Built with ❤️ by the QWick Team</p>
  <p>
    <a href="https://codebuff.com/docs">Codebuff Docs</a> ·
    <a href="https://qwick.com">QWick Website</a>
  </p>
</div>
