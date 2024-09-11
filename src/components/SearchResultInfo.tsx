import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

/**
 * Renders a message indicating how many restaurants were found in the given city.
 *
 * If the user is not in the city page, it also renders a link to go back to the homepage
 * to change the location of the search.
 *
 * @param {Props} props
 * @param {number} props.total
 * @param {string} props.city
 *
 * @returns {JSX.Element}
 */
//
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
