import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

/**
 * Renders the header section of the page, which contains a logo and a navigation menu.
 *
 * The logo is always visible, while the navigation menu is only visible on medium
 * screen sizes and above. On smaller screen sizes, the navigation menu is hidden and
 * replaced with a mobile navigation menu.
 * @returns The header section of the page.
 */
const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link className="text-3xl font-bold tracking-tight text-orange-500" to="/">
                Taste of Algeria
            </Link>
            <div className="md:hidden">  
                <MobileNav/>
            </div>
            <div className="hidden md:block">
              <MainNav/>
            </div>
        </div>
    </div>
  )
}

export default Header;