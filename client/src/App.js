import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import './style.scss'
import BWrite from "./pages/BWrite";
import Deblogs from "./pages/DeBlogs";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/bwrite",
        element: <BWrite/>,
      },
      {
        path: "/deblogs",
        element: <Deblogs/>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}


export default App;
