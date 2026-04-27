import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Splash } from "./screens/Splash";
import { Onboarding } from "./screens/Onboarding";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Home } from "./screens/Home";
import { SearchResults } from "./screens/SearchResults";
import { DestinationDetails } from "./screens/DestinationDetails";
import { PhotoGallery } from "./screens/PhotoGallery";
import { Reviews } from "./screens/Reviews";
import { Trips } from "./screens/Trips";
import { Bookings } from "./screens/Bookings";
import { BookingDetails } from "./screens/BookingDetails";
import { BookingFlow } from "./screens/BookingFlow";
import { BookingConfirmation } from "./screens/BookingConfirmation";
import { MapExplore } from "./screens/MapExplore";
import { Profile } from "./screens/Profile";
import { CategoryListing } from "./screens/CategoryListing";
import { ItineraryPlanner } from "./screens/ItineraryPlanner";
import { ItineraryMap } from "./screens/ItineraryMap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <SearchResults /> },
      { path: "destination/:id", element: <DestinationDetails /> },
      { path: "destination/:id/gallery", element: <PhotoGallery /> },
      { path: "destination/:id/reviews", element: <Reviews /> },
      { path: "category/:category", element: <CategoryListing /> },
      { path: "trips", element: <Trips /> },
      { path: "bookings", element: <Bookings /> },
      { path: "bookings/:id", element: <BookingDetails /> },
      { path: "book/:id", element: <BookingFlow /> },
      { path: "booking-confirmation/:id", element: <BookingConfirmation /> },
      { path: "map", element: <MapExplore /> },
      { path: "profile", element: <Profile /> },
      { path: "planner", element: <ItineraryPlanner /> },
      { path: "itinerary-map", element: <ItineraryMap /> },
    ],
  },
]);
