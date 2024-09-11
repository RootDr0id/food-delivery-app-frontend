import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};
/**
 * An Auth0Provider that will redirect to the /auth-callback route after
 * authentication,or a given route after passing any appState as a query parameter.
 *
 * @param children the children to render inside the Auth0Provider
 * @returns the Auth0Provider component
 */
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth");
  }

  /**
   * Handles the redirect callback from Auth0 after login or logout.
   *
   * If an `appState` object is provided, it will be used to navigate to
   * the `returnTo` path. Otherwise, the app will navigate to the
   * `/auth-callback` route.
   *
   * @param appState - the app state object returned from Auth0
   */
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
