import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import PostCreatePage from './pages/PostCreatePage';
import BotUserPage from './pages/BotUserPage';
import GroupsPage from './pages/GroupsPage';
import AccountPage from './pages/AccountPage';

// ----------------------------------------------------------------------

export default function Router() {
  
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'bot-user', element: <UserPage /> },
        { path: 'groups', element: <GroupsPage /> },
        { path: 'post', element: <PostPage /> },
        { path: 'post-create', element: <PostCreatePage /> },
        { path: 'user', element: <BotUserPage /> },
        { path: 'settings', element: <AccountPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
