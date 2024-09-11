import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * This page is only accessible immediately after the user has logged in.
 * It is responsible for creating a new user in our database if the user
 * doesn't already exist, and then redirecting the user to the home page.
 * @returns a loading message
 */
const AuthCallbackPage = () => {
  const navigate = useNavigate(); //to navigate away from this callback page to the home pagee
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);//useref stores a state value that doesn't trigger a rerender u^pon its change unlike usestate

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
