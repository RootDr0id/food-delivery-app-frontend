//import { User } from "@/types";
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //adress of backend API

//IN here we have our 3 hooks that will interact with our endpoints
//Which we'll find in Backend/src/routes/MyUserRoutes.tsx (it"s our backend api) 

/**
 * Hook that fetches the current user from the backend api.
 *
 * Returns an object with three properties:
 * - `currentUser`: the current user object, or `undefined` if the request is still loading
 * - `isLoading`: a boolean indicating whether the request is still loading
 * - `error`: an error object if the request fails
 *
 * @returns {object} an object with the currentUser, isLoading and error properties
 */
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,//proves that the user is logged in
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);//UseQuery hook retruns the json
  //that we get from the getMyUserRequest (request body) as the data property that we renamed into currentUser
  //fetchCurrentUser is the name of the query to which we passed the fetch request and reactQuery handles it.


  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

  /**
   * Hook that sends a request to the backend to create a user.
   *
   * Returns an object with four properties:
   * - `createUser`: a function that sends the request to the backend
   * - `isLoading`: a boolean indicating whether the request is still loading
   * - `isError`: a boolean indicating whether the request resulted in an error
   * - `isSuccess`: a boolean indicating whether the request was successful
   *
   * @returns {object} an object with the createUser, isLoading, isError, and isSuccess properties
   */
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);//passing fetch request to the usemutation Hook 
  //so that reactquery can handle the request for us

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {//email is not sent, just for display purposes
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

/**
 * Hook that sends a request to the backend to update the current user.
 *
 * Returns an object with two properties:
 * - `updateUser`: a function that sends the request to the backend
 * - `isLoading`: a boolean indicating whether the request is still loading
 *
 * @returns {object} an object with the updateUser and isLoading properties
 */
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest); 

  //Now we'll handle error messages in here instead of inside the component 
  //So that that the error handling is detached from the component
  // It can be that there are many components that update the userProfile
  // But the error handling is done in one place only inside this hook
  
  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
      toast.error(error.toString());
    reset();// clears the error state from the request for the next render(refresh for example)
  }
  

  return { updateUser, isLoading };
};
