import SignUp from "./entities/user/components/SignUp";
import OtpPage from "./entities/user/components/OtpPage";
import { useRoutes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import Navbar from "./entities/user/components/Navbar";
import About from "./entities/user/About";
import Home from "./entities/user/Home";
import FindHospital from "./entities/user/FindHospital";
import Contact from "./entities/user/Contact";
import GeneralQuery from "./entities/user/GeneralQuery";
import Speciality from "./entities/user/Speciality";
import Profile from "./entities/user/Profile";
import NotFound from "./entities/user/NotFound";
import Testimonial from "./entities/user/Testimonial";
import Sidebar from "./entities/manager/components/Sidebar";

import ManageDoctor from "./entities/manager/ManageDoctor";
import Appointments from "./entities/manager/AppointmentPage";
import Specialist from "./entities/user/Specialist";

function App() {
  const route = useRoutes([
    {
      element: <Navbar />,
      children: [
        {
          path: "/login",
          element: <AuthRoute />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/otp",
          element: <OtpPage />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/testimonial",
          element: <Testimonial />,
        },
        {
          path: "/find",
          element: <FindHospital />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/query",
          element: <GeneralQuery />,
        },
        {
          path: "/hospital/:id",
          element: <Speciality />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/specialist/",
          element: <Specialist />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      element: <Sidebar />,
      children: [
        {
          path: "/manager",
          element: <ManageDoctor />,
        },
        {
          path: "/manager/appointments",
          element: <Appointments />,
        },
        
      ],
    },
  ]);

  return route;
}

export default App;
