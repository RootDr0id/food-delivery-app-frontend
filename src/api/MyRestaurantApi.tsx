import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /**
   * Hook that fetches my restaurant from our backend api.
   *
   * Returns an object with two properties:
   * - `restaurant`: the restaurant object, or `undefined` if the request is still loading
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the restaurant and isLoading properties
   */
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  /**
   * Request that we'll send to the backend endpoint to fetch my restaurant.
   *
   * @returns {Promise<Restaurant>} a promise that resolves with the restaurant object
   */
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};


  /**
   * Hook that sends a request to the backend to create a restaurant.
   *
   * Returns an object with two properties:
   * - `createRestaurant`: a function that sends the request to the backend
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the createRestaurant and isLoading properties
   */
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  /**
   * Request that we'll send to the backend endpoint to create a restaurant.
   *
   * @param {FormData} restaurantFormData - form data containing restaurant details
   * @returns {Promise<Restaurant>} a promise that resolves with the created restaurant object
   */

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

  /**
   * Hook that sends a request to the backend to update a restaurant.
   *
   * Returns an object with two properties:
   * - `updateRestaurant`: a function that sends the request to the backend
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the updateRestaurant and isLoading properties
   */
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  /**
   * Request that we'll send to the backend endpoint to update my restaurant.
   *
   * @param {FormData} restaurantFormData - form data containing restaurant details
   * @returns {Promise<Restaurant>} a promise that resolves with the updated restaurant object
   */
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

  /**
   * Hook that fetches my restaurant orders from the backend api.
   *
   * Returns an object with two properties:
   * - `orders`: an array of order objects, or `undefined` if the request is still loading
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the orders and isLoading properties
   */
export const useGetMyRestaurantOrders = () => {// hook that fetches my restaurant orders from the backend api
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {//backend end point
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(//useQuery hook that we will use to fetch our orders
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };//retrun the orders
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

  /**
   * Hook that sends a request to the backend to update a restaurant order.
   *
   * Returns an object with two properties:
   * - `updateRestaurantStatus`: a function that sends the request to the backend
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the updateRestaurantStatus and isLoading properties
   */
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
