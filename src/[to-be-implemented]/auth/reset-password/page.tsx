'use client';

import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { ResetSchema } from '@/schema';

/**
 * Password-reset page. Renders <AuthForm mode="resetPassword" schema={ResetSchema}>
 * — AuthForm from '@/components/auth/AuthForm' and ResetSchema from '@/schema'
 * (email field only; schema/index.ts:54-58) — whose submit POSTs
 * /api/auth/reset-password (AuthForm.tsx:99) and toasts "Password reset email sent." on success.
 * Child link back to /auth/login ("Sign in") for users who remembered their password.
 * NOT routed: src/app defines no auth pages; this file sits in the parked src/[to-be-implemented] tree.
 */
const ResetPasswordPage = () => {


  return (
    <AuthForm mode="resetPassword" schema={ResetSchema}>
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">
          Remembered your password?{' '}
        </span>
        <a
          href="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Sign in
        </a>
      </div>
    </AuthForm>
  );
};

export default ResetPasswordPage;
