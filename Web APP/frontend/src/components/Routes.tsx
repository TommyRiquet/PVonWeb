import Home from "./app/views/Home/Home";
import SignIn from "./app/views/SignIn/SignIn";
import Login from "./app/views/Login/Login";
import Error from "./app/views/Error/Error";

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
    path: "*",
    component: Error,
    exact: true,
  },
];

export default AppRoutes;