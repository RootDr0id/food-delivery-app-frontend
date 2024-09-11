import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

  /**
   * The SearchPage component renders the search page.
   *
   * It renders a search bar at the top of the page that allows users to search for
   * restaurants by name or cuisine.
   *
   * Below the search bar, it renders a list of cuisines that can be used to filter
   * the search results.
   *
   * The list of cuisines is rendered as a grid of checkboxes, with the name of each
   * cuisine as a label next to the checkbox.
   * The cuisines are rendered in alphabetical order.
   *
   * The user can select one or more cuisines to filter the search results.
   *
   * When the user clicks on a cuisine, the page will re-render with the search results
   * filtered to only show restaurants that serve that cuisine.
   *
   * The page will also render a link to reset the filter, which will re-render the
   * page with all the search results.
   *
   * Below the list of cuisines, the component renders the search results.
   * The search results are rendered as a grid of cards, with each card containing the
   * name, cuisines, estimated delivery time, and delivery price of a restaurant.
   *
   * The user can click on a card to view more information about a restaurant.
   *
   * The component also renders pagination controls that allow the user to navigate
   * between the pages of search results.
   *
   * The component uses the useSearchRestaurants hook to fetch the search results from
   * the backend.
   *
   * The component uses the useSearchParams hook to read the search query from the URL
   * and to update the URL when the user searches for something new.
   *
   * The component uses the useState hook to keep track of the search query and the
   * selected cuisines.
   *
   * The component uses the useEffect hook to update the URL when the user searches for
   * something new.
   *
   * The component uses the useNavigate hook to navigate to the restaurant detail page
   * when the user clicks on a card.
   */
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants( searchState,  city);
//Pass the searchState to our api request so that it can be passed to the backend
//and applied to the query used to search the database
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Cuisine/Restaurant"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
