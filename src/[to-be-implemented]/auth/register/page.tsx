'use client';

import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { RegisterSchema } from '@/schema';

/**
 * Registration page. Renders <AuthForm mode="signup" schema={RegisterSchema}> —
 * AuthForm from '@/components/auth/AuthForm' and RegisterSchema from '@/schema'
 * (email plus an 8-32 character password with no spaces; schema/index.ts:23-46) —
 * whose submit POSTs /api/auth/signup (AuthForm.tsx:80) and toasts the result.
 * Child link to /auth/login ("Sign in") for users who already have an account.
 * NOT routed: src/app defines no auth pages; this file sits in the parked src/[to-be-implemented] tree.
 */
const RegisterPage = () => {

  return (
    <AuthForm mode="signup" schema={RegisterSchema}>
      <div className="mt-4 pt-2 text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
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

export default RegisterPage;
