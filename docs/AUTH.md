# Authentication & Authorization

## Stack
- **Library**: better-auth
- **Database**: PostgreSQL
- **Email**: Resend + React Email

## User Model
Standard better-auth fields plus custom:
- `phoneNumber` (optional string)
- `organization` (optional string)
- `role` (string, default: `"user"`)

## Auth Flow
1. **Signup** → email verification sent via Resend → auto sign-in after verification
2. **Login** → email/password, session cookie
3. **Forgot Password** → reset email with token link
4. **Reset Password** → token-based password change

## Route Protection (middleware.ts)
- `/admin/*` → requires authenticated user with `role === 'admin'` (except `/admin/login`)
- `/dashboard/*` → requires any authenticated user
- Unauthenticated users redirected to `/login` or `/admin/login`

## Auth Pages
- `/login` — Client login
- `/signup` — Client registration
- `/forgot-password` — Password reset request
- `/reset-password` — Password reset form
- `/admin/login` — Admin login (under `(auth)` group)

## Email Templates
- `src/emails/verification.tsx` — Email verification
- `src/emails/reset-password.tsx` — Password reset

## Client-Side Auth
- `src/lib/auth-client.ts` — `createAuthClient()` from better-auth/react
- Base URL from `NEXT_PUBLIC_APP_URL`

## Trusted Origins
- `http://localhost:3000`
- `http://admin.localhost:3000`
- `https://momtaz.ws`
- `https://admin.momtaz.ws`
