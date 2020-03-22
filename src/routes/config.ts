import Login from 'pages/Login';
import Main from 'pages/Main';

const routes = [
  {
    id: 1,
    path: '/login',
    exact: true,
    RouteComponent: Login,
  },
];

const protectedRoutes = [
  {
    id: 1,
    path: '/',
    exact: true,
    RouteComponent: Main,
  },
];

export { routes, protectedRoutes };
