"use client";
import { Auth } from '@/components/auth/Auth';

/**
 * Renders the authentication component in 'login' mode.
 * This page is the dedicated entry point for users to sign in.
 */
export default function LoginPage() {
  return <Auth mode="login" />;
}
