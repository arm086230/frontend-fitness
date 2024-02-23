import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import NewTodoForm from "../layout/NewTodoForm";
import Booking from "../layout/Booking";
import Admin from "../layout/Admin";

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
      { index: true, element: <LoginForm /> },
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
      { path: "/new", element: <NewTodoForm /> },
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
      { index: true, element: <UserHome /> },
      { path: "/new", element: <NewTodoForm /> },
      { path: "/admin/Booking", element: <Admin /> },
    ],
  },
]);


export default function AppRouter() {
  const { user } = useAuth();
  // console.log(user?.role)
  const finalRouter = user?.id ? (user.role ==="ADMIN" ? adminRouter: userRouter) : guestRouter
  return <RouterProvider router={finalRouter} />;
}
