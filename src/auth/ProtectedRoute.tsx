import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

//This component will run a logic that'll check if the user is logged in
//Then if they are we"ll allow them through the protected route they're trying to acess
//If not we'll redirect them to the home page
const ProtectedRoute = () => {
  const{isAuthenticated}=useAuth0();
  return isAuthenticated ? (<Outlet/>) : (<Navigate to ="/" replace/>);
//Outlet renders all the child routes of this component.
//In our case it"ll do so if isAuthenticated is true	
}

export default ProtectedRoute;