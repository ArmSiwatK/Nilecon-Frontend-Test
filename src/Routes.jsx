import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from './pages/Home';

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/home',
            element: <Home />
        },

        {
            path: '*',
            element: <Navigate to="/home" replace />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default Routes;