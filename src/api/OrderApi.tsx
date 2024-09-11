import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /**
   * Hook that fetches my orders from our backend api.
   *
   * Returns an object with two properties:
   * - `orders`: an array of order objects, or `undefined` if the request is still loading
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @returns {object} an object with the orders and isLoading properties
   */
export const useGetMyOrders = () => {//Hook that fetches my orders from our backend api
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {//Request that we'll send to the backend endpoint
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {//Backend endpoint to fetch my orders
      headers: {//without a specified method the deafault is GET
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,//refetch every 5 seconds
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

  /**
   * Hook that sends a request to the backend to create a Stripe checkout session.
   *
   * Returns an object with two properties:
   * - `createCheckoutSession`: a function that sends the request to the backend
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * @param {CheckoutSessionRequest} checkoutSessionRequest the request to create a checkout session
   * @returns {object} an object with the createCheckoutSession and isLoading properties
   */
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
