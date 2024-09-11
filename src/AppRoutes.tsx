import Layout from "./layouts/layout";
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

/**
 * This component renders the main routes of the application.
 *
 * It renders:
 * - The home page at the root path.
 * - The search page at the path /search/:city.
 * - The detail page at the path /detail/:restaurantId.
 * - The order status page at the path /order-status.
 * - The user profile page at the path /user-profile.
 * - The manage restaurant page at the path /manage-restaurant.
 *
 * It also renders a catch-all route that redirects to the home page
 * if the route is not recognized.
 */
const AppRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage /></Layout>} />
            
            <Route path="/auth-callback" element={<AuthCallbackPage/>} />
            <Route path="/search/:city" element={<Layout showHero={false}> <SearchPage /></Layout>} />
            <Route path="/detail/:restaurantId" element={<Layout showHero={false}> <DetailPage /></Layout>} />

            <Route element={<ProtectedRoute/>}>
            <Route path="/order-status" element={<Layout><OrderStatusPage /></Layout>} />
            <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
            <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage/></Layout>} />
            </Route>

            <Route path="*" element={<Navigate to ="/"/>} />
        </Routes>
    )
}
export default AppRoutes;