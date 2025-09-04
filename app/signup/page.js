"use client";
import { Auth } from '@/components/auth/Auth';

/**
 * Renders the authentication component in 'signup' mode.
 * This page is the dedicated entry point for new users to create an account.
 */
export default function SignupPage() {
  return <Auth mode="signup" />;
}