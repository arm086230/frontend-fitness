import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import Booking from "../layout/Booking";
import Admin from "../layout/Admin";
import AddTainer from "../layout/addtainer";
import Addworkout from "../layout/addworkout";
import Showworkout from "../layout/showworkout";
import Showtainer from "../layout/Showtainer";
import Showuser from "../layout/Showuser"
import Trainer from "../layout/Trainer";
import Home from "../layout/Home"





const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      {path: "/login", element: <LoginForm />},
      { path: "/register", element: <RegisterForm /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "/new", element: <Trainer /> },
      { path: "/Booking", element: <Booking /> },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Addworkout /> },
      { path: "/admin/Addworkout", element: <Addworkout /> },
      { path: "/admin/Booking", element: <Admin /> },
      { path: "/admin/AddTainer", element: <AddTainer /> },
      { path: "/admin/showworkout", element: <Showworkout /> },
      { path: "/admin/showtainer", element: <Showtainer /> },
      { path: "/admin/showuser" , element: <Showuser /> },
    ],
  },
]);

const TainerRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "/new", element: <Trainer /> },
      { path: "/Booking", element: <Booking /> },
    ],
  },
]);


export default function AppRouter() {
  const { user } = useAuth();
  // console.log(user?.role)
  const finalRouter = user?.id ? (user.role ==="ADMIN" ? adminRouter: user.role === "TAINER" ? TainerRouter : userRouter) : guestRouter
  return <RouterProvider router={finalRouter} />;
}
