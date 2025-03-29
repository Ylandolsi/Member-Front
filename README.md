# Members Only - Front End

A secure, members-only application for creating and sharing posts with other authenticated users. This React application features user authentication, post management, and a two-step verification process.

## 📋 Features

- **User Authentication**: Register and login with JWT token-based security
- **Post Management**: Create, view, and delete posts
- **Second Verification**: Additional security layer to access full post content
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes
- **User Profile**: View your own posts

## 🚀 Technologies Used

- React 19
- TypeScript
- React Router v7
- Zod for form validation
- SCSS for styling
- JWT authentication
- React Hook Form

## 🔒 Authentication Flow

The application uses JWT tokens for authentication:

- Access tokens are stored in localStorage
- Refresh tokens automatically renew access tokens every 3 minutes
- Authentication state is managed through a React context
- Protected routes redirect unauthenticated users to login

## 🎭 Second Verification

After logging in, users must complete a second verification step to view full post content. This involves typing "Palestine" in a verification box.
