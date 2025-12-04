# Email Authentication Setup Guide

This guide explains how to set up email/password authentication with email verification using Resend.

## Required Environment Variables

Add these variables to your `.env.local` file:

```bash
# Resend Email Service
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# NextAuth Configuration (ensure these exist)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## Resend Setup

1. **Create Resend Account**
   - Go to [resend.com](https://resend.com)
   - Create an account and verify your email

2. **Get API Key**
   - Navigate to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key to `RESEND_API_KEY` in your `.env.local`

3. **Configure Domain (Production)**
   - Add your domain in Resend dashboard
   - Update `RESEND_FROM_EMAIL` to use your domain
   - Example: `noreply@yourapp.com`

## Features Implemented

### Email/Password Authentication
- ✅ User registration with email/password
- ✅ Password strength validation (8+ chars, lowercase, number)
- ✅ Secure password hashing (bcrypt, 12 rounds)
- ✅ Email verification flow
- ✅ Sign in with credentials
- ✅ Modern, responsive UI with tabs

### Email Verification
- ✅ Automatic email sending on registration
- ✅ Verification email templates via Resend
- ✅ Email verification page
- ✅ Integration with existing AuthJS flow

### UI/UX Features
- ✅ Modern card-based design
- ✅ Tab interface (Sign In / Sign Up)
- ✅ Real-time form validation with Zod
- ✅ Loading states and error handling
- ✅ Password visibility toggle
- ✅ Responsive design
- ✅ Integration with existing Google auth

## Database Schema

The existing AuthJS schema already supports email authentication:

- `users` table: stores user info and email verification status
- `accounts` table: stores credentials provider data (hashed passwords)
- `verification_tokens` table: handles email verification tokens
- `sessions` table: manages user sessions

**No additional migrations are needed!**

## Security Features

- Password hashing with bcrypt (12 rounds)
- Email verification required for new accounts
- CSRF protection via AuthJS
- Input validation with Zod schemas
- Rate limiting (built into AuthJS)

## Files Created

### Authentication Utilities
- `src/lib/auth/password.ts` - Password hashing and validation
- `src/lib/auth/validation.ts` - Zod validation schemas

### API Routes
- `src/app/api/auth/register/route.ts` - User registration endpoint

### UI Components
- `src/components/auth/AuthTabs.tsx` - Tab switching component
- `src/components/auth/EmailPasswordForm.tsx` - Main authentication form

### Pages
- `src/app/signin/page.tsx` - Sign in/up page with modern UI
- `src/app/auth/verify-email/page.tsx` - Email verification page

## Testing

1. Start your development server: `yarn dev`
2. Navigate to `/signin`
3. Try creating a new account with the "Sign Up" tab
4. Check your email for verification link
5. Test sign in with email/password

## Authentication Flow

### Registration Flow
1. User fills out sign-up form with name, email, and password
2. Password is validated against strength requirements
3. User record is created in database
4. Password is hashed and stored securely in accounts table
5. Verification email is sent automatically via Resend
6. User is redirected to verification page

### Sign In Flow
1. User enters email and password
2. Credentials are validated against database
3. Password is verified using bcrypt
4. JWT session is created
5. User is redirected to dashboard

### Email Verification Flow
1. Resend sends verification email
2. User clicks verification link in email
3. AuthJS handles token validation automatically
4. User's email is marked as verified in database

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Verify `RESEND_API_KEY` is correct
   - Check Resend dashboard for sending limits
   - Ensure domain is verified (production)

2. **Password validation errors**
   - Check password requirements (8+ chars, lowercase, number)
   - Verify Zod schema validation

3. **TypeScript errors**
   - Run `yarn build` to check for type issues
   - Ensure all imports are correct

### Development Tips

- Use a temporary email service for testing
- Check browser console for detailed error messages
- Monitor Resend dashboard for email delivery status
- Test both successful and error scenarios

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement custom email templates
- [ ] Add social login providers (GitHub, Discord, etc.)
- [ ] Set up email notifications for important events
- [ ] Add two-factor authentication (2FA)
