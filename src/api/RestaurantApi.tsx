import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /**
   * Hook that fetches a restaurant by its id from the backend api.
   *
   * Returns an object with two properties:
   * - `restaurant`: the restaurant object, or `undefined` if the request is still loading
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * If `restaurantId` is not defined, the query will be disabled.
   *
   * @param {string} [restaurantId] - the id of the restaurant to fetch
   * @returns {object} an object with the restaurant and isLoading properties
   */
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,//only enable the query when restaurantId is defined
    }
  );

  return { restaurant, isLoading };
};

  /**
   * Hook that fetches a list of restaurants from the backend api.
   *This is different from `useGetRestaurant` in that it's caled with a search query.
   * The query will be refetched whenever `searchState` changes.
   *
   * Returns an object with two properties:
   * - `results`: the list of restaurants that match the search parameters, or `undefined` if the request is still loading
   * - `isLoading`: a boolean indicating whether the request is still loading
   *
   * If `city` is not defined, the query will be disabled.
   *
   * @param {SearchState} searchState - the search parameters
   * @param {string} [city] - the city to search in
   * @returns {object} an object with the results and isLoading properties
   */
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
     const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption); 

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],//Anytime searchState changes, the query will be refetched
    createSearchRequest,
    { enabled: !!city } //if city is undefined then the query will not be enabled
  );

  return {
    results,
    isLoading,
  };
};
