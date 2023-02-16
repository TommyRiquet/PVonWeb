// This file contains all the routes of the application
//
// Import views
import Home from "./app/views/Home/Home";
import Error from "./app/views/Error/Error";
import Dashboard from "./app/views/Dashboard/Dashboard";

// Import auth routes
import SignIn from "./auth/SignIn/SignInScreen";
import Login from "./auth/Login/LoginScreen";

const AppRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/signin",
    component: SignIn,
    exact: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "*",
    component: Error,
    exact: true,
  },
];

export default AppRoutes;
