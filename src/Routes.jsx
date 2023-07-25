import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from './pages/Home';
import SelectTicket from './pages/SelectTicket';

const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/select-ticket',
            element: <SelectTicket />
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