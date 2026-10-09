import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LoginSchema } from "@/schema";
import AuthForm from "@/components/auth/AuthForm";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn().mockResolvedValue({ error: null, ok: true, status: 200, url: null }),
  useSession: vi.fn(() => ({ data: null, status: "unauthenticated" })),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

/**
 * Smoke / module-loadability invariant:
 * AuthForm is a "use client" component. It must be importable and renderable
 * in a browser-like environment without pulling in Node-only or server-only
 * modules (e.g. next-auth/providers/email -> nodemailer).
 */
describe("AuthForm module loadability", () => {
  it("imports and renders the sign-in form in a browser-like environment", () => {
    render(
      <AuthForm mode="signin" schema={LoginSchema}>
        <p>auth links</p>
      </AuthForm>,
    );

    expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders the reset-password form without a password field", () => {
    render(
      <AuthForm mode="resetPassword" schema={LoginSchema}>
        <p>auth links</p>
      </AuthForm>,
    );

    expect(screen.getByRole("heading", { name: "Reset Password" })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Password")).not.toBeInTheDocument();
  });
});
