import { createFileRoute } from "@tanstack/react-router";
import SignIn from "@/components/Login/SignIn";
import { UserAuth } from "@/context/AuthContext";
import "@/styles/Login.scss";

export const Route = createFileRoute("/Login")({
  component: Login,
});

function Login() {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await googleSignIn();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return <SignIn />;
}

// Protected Route for account page/dashboard
