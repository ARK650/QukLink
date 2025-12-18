import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Contact from './Contact';
import Pricing from './Pricing';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ProfileSetup from './ProfileSetup';
import Dashboard from './Dashboard';
import MyLinks from './MyLinks';
import Collections from './Collections';
import Analytics from './Analytics';
import Notifications from './Notifications';
import Settings from './Settings';
import Profile from './Profile';
import Products from './shop/Products';
import Orders from './shop/Orders';
import Sales from './shop/Sales';
import MySubscriptions from './subscriptions/MySubscriptions';
import Subscribers from './subscriptions/Subscribers';
import MyBookmarks from './bookmarks/MyBookmarks';
import BookmarkCollections from './bookmarks/BookmarkCollections';
import PaymentsPayout from './settings/PaymentsPayout';
import ProfileSettings from './settings/ProfileSettings';

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/profile-setup',
    element: <ProfileSetup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/my-links',
    element: <MyLinks />,
  },
  {
    path: '/collections',
    element: <Collections />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/settings/payments-payout',
    element: <PaymentsPayout />,
  },
  {
    path: '/settings/profile',
    element: <ProfileSettings />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/shop/products',
    element: <Products />,
  },
  {
    path: '/shop/orders',
    element: <Orders />,
  },
  {
    path: '/shop/sales',
    element: <Sales />,
  },
  {
    path: '/subscriptions/my-subscriptions',
    element: <MySubscriptions />,
  },
  {
    path: '/subscriptions/subscribers',
    element: <Subscribers />,
  },
  {
    path: '/bookmarks/my-bookmarks',
    element: <MyBookmarks />,
  },
  {
    path: '/bookmarks/collections',
    element: <BookmarkCollections />,
  },
]);

// Router component to be used in main.tsx
export default function Router() {
  return <RouterProvider router={router} />;
}
