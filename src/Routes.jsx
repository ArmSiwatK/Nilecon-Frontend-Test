import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ScreenContextProvider } from './ScreenContext';
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
        <ScreenContextProvider>
            <RouterProvider router={router} />
        </ScreenContextProvider>
    );
};

export default Routes;
