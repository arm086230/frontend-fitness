import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import Booking from "../layout/Booking";
import AddTrainer from "../layout/addtainer"
import Admin from "../layout/Admin";
import Addworkout from "../layout/addworkout";
import Showworkout from "../layout/showworkout";
import Showtainer from "../layout/Showtainer";
import Showuser from "../layout/Showuser"
import Trainer from "../layout/Trainer";
import Home from "../layout/Home"
import Bmi from "../layout/bmi"
import Detail from "../layout/Trainerdetails"
import TrainerBooking from "../layout/trainerbooking"





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
      { path: "/BmiForm", element: <Bmi/> },
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
      { path: "/admin/AddTrainer", element: <AddTrainer /> },
      { path: "/admin/showworkout", element: <Showworkout /> },
      { path: "/admin/showTrainer", element: <Showtainer /> },
      { path: "/admin/showuser" , element: <Showuser /> },
      { path: "/admin/trainerdetails/:id", element: <Detail /> },
    ],
  },
]);

const TrainerRouter = createBrowserRouter([
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
      { path: "/trainer/booking", element: <TrainerBooking /> },
    ],
  },
]);


export default function AppRouter() {
  const { user } = useAuth();
  // console.log(user?.role)
  const finalRouter = user?.id ? (user.role ==="ADMIN" ? adminRouter: user.role === "TRAINER" ? TrainerRouter : userRouter) : guestRouter
  return <RouterProvider router={finalRouter} />;
}
