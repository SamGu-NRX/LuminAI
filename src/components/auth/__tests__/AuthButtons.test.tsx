import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DiscordSignInButton,
  EmailSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/auth/AuthButtons";

/**
 * Behavioral suite for the four sign-in buttons in AuthButtons.tsx.
 *
 * AuthButtons imports `import * as m from "framer-motion/m"` (a namespace
 * import of tag proxies such as m.button). Every button is rendered here
 * against the real framer-motion package in jsdom, so this suite passing is
 * itself the regression test that the namespace import keeps resolving.
 * framer-motion is deliberately NOT mocked.
 */

type OAuthButtonComponent = typeof GoogleSignInButton;

type OAuthCase = {
  component: OAuthButtonComponent;
  defaultLabel: string;
  customLabel: string;
};

const oauthCases: OAuthCase[] = [
  { component: GoogleSignInButton, defaultLabel: "Continue with Google", customLabel: "Google entry" },
  { component: DiscordSignInButton, defaultLabel: "Continue with Discord", customLabel: "Discord entry" },
  { component: GithubSignInButton, defaultLabel: "Continue with Github", customLabel: "Github entry" },
];

type EmailMode = "signin" | "signup" | "resetPassword";

const emailModes: [EmailMode, string][] = [
  ["signin", "Sign In"],
  ["signup", "Sign Up"],
  ["resetPassword", "Reset Password"],
];

describe("OAuth sign-in buttons", () => {
  it.each(oauthCases)("$defaultLabel renders with its default label", ({ component, defaultLabel }) => {
    const OAuthButton = component;
    render(<OAuthButton handleClick={vi.fn()} isLoading={false} />);

    expect(screen.getByRole("button", { name: defaultLabel })).toBeInTheDocument();
  });

  it.each(oauthCases)("custom buttonText overrides the default label", ({ component, customLabel, defaultLabel }) => {
    const OAuthButton = component;
    render(<OAuthButton buttonText={customLabel} handleClick={vi.fn()} isLoading={false} />);

    expect(screen.getByRole("button", { name: customLabel })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: defaultLabel })).not.toBeInTheDocument();
  });

  it.each(oauthCases)("renders without type=submit", ({ component }) => {
    const OAuthButton = component;
    render(<OAuthButton handleClick={vi.fn()} isLoading={false} />);

    expect(screen.getByRole("button")).not.toHaveAttribute("type", "submit");
  });

  it.each(oauthCases)("calls handleClick exactly once when clicked while not loading", async ({ component }) => {
    const OAuthButton = component;
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<OAuthButton handleClick={handleClick} isLoading={false} />);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it.each(oauthCases)("while loading: disabled, shows 'Loading...', and never calls handleClick", async ({ component }) => {
    const OAuthButton = component;
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<OAuthButton handleClick={handleClick} isLoading={true} />);

    const button = screen.getByRole("button", { name: "Loading..." });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("All four sign-in buttons", () => {
  it("renders every exported button at once", () => {
    render(
      <>
        <GoogleSignInButton handleClick={vi.fn()} isLoading={false} />
        <DiscordSignInButton handleClick={vi.fn()} isLoading={false} />
        <GithubSignInButton handleClick={vi.fn()} isLoading={false} />
        <EmailSignInButton mode="signin" isLoading={false} />
      </>,
    );

    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue with Discord" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue with Github" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });
});

describe("EmailSignInButton", () => {
  it.each(emailModes)("renders '%s' in %s mode", (mode, label) => {
    render(<EmailSignInButton mode={mode} isLoading={false} />);

    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it("falls back to 'Reset Password' when mode is omitted (pins current behavior)", () => {
    render(<EmailSignInButton isLoading={false} />);

    expect(screen.getByRole("button", { name: "Reset Password" })).toBeInTheDocument();
  });

  it("renders type=submit", () => {
    render(<EmailSignInButton mode="signin" isLoading={false} />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("is disabled and shows 'Loading...' while loading", () => {
    render(<EmailSignInButton mode="signin" isLoading={true} />);

    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();
  });
});
