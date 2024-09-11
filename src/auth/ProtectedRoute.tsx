import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


/**
 * ProtectedRoute component
 *
 * If the user is authenticated (i.e. isAuthenticated===true),
 * it renders all the child routes of this component.
 * If the user is not authenticated (i.e. isAuthenticated===false),
 * it redirects to the homepage.
 * If the user is still loading (i.e. isLoading===true),
 * it renders nothing.
 */
const ProtectedRoute = () => {
  const{isAuthenticated,isLoading}=useAuth0();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;

//Outlet renders all the child routes of this component.
//In our case it"ll do so if isAuthenticated is true	
//otherwise it'll redirect to the homepage
}

export default ProtectedRoute;