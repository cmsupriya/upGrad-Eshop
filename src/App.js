import './App.css';
import React from 'react';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  const router = RouterProvider([
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signUp",
      element: <SignUp/>
    },
  ])

  return (
    <>
    <Navbar/>
      <RouterProvider router={router}/>
    </>
  )
}

export default App