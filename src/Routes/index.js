import React from "react";
import Dashboard from '../Layouts/Dashboard';
import User from '../Pages/User'
import Home from '../Pages/Home'
import Post from '../Pages/Post'
import {
  createBrowserRouter, 
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children: [
      {
        path: "users",
        element: <User/>
      },
      {
        path: "posts",
        element: <Post/>
      },
      {
        path: "home",
        element: <Home/>
      }
    ]
  },
]);

export default router


