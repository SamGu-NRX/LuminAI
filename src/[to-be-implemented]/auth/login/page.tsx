'use client';

import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { LoginSchema } from '@/schema';

/**
 * Sign-in page. Renders <AuthForm mode="signin" schema={LoginSchema}> — AuthForm
 * from '@/components/auth/AuthForm' and LoginSchema from '@/schema' — which submits
 * via next-auth signIn("credentials", { redirect: false }) (AuthForm.tsx:65-76) and,
 * on success, redirects to /onboarding or /dashboard (AuthForm.tsx:144-148).
 * Children link to /auth/reset-password ("Forgot password?") and /auth/register ("Sign up").
 * NOT routed: src/app defines no auth pages; this file sits in the parked src/[to-be-implemented] tree.
 */
const SignInPage = () => {
  return (
    <AuthForm mode="signin" schema={LoginSchema}>
      <div className="mt-4 pt-2 text-center">
        <a
          href="/auth/reset-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
        </span>
        <a
          href="/auth/register"
          className="text-sm text-blue-600 hover:underline"
        >
          Sign up
        </a>
      </div>
    </AuthForm>
  );
};

export default SignInPage;
