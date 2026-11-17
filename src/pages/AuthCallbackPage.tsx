import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Creates the authenticated user's database record when needed.
 * The home page is shown only after the backend confirms the request.
 */
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth0();
  const { createUser } = useCreateMyUser();
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const email = user?.email;
    if (!user?.sub || !email) {
      navigate("/", { replace: true });
      return;
    }

    let isActive = true;

    const initializeUser = async () => {
      try {
        await createUser({ email });
        if (isActive) {
          navigate("/", { replace: true });
        }
      } catch {
        if (isActive) {
          setHasError(true);
        }
      }
    };

    setHasError(false);
    initializeUser();

    return () => {
      isActive = false;
    };
  }, [createUser, isAuthLoading, navigate, retryCount, user?.email, user?.sub]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <p>We couldn't finish setting up your account. Please check your connection and try again.</p>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          Try again
        </button>
      </div>
    );
  }

  return <>Loading...</>;
};

export default AuthCallbackPage;
