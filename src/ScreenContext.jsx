import React, { createContext, useState } from 'react';

const ScreenContext = createContext();

const ScreenContextProvider = ({ children }) => {
    const [selectedScreen, setSelectedScreen] = useState(null);

    return (
        <ScreenContext.Provider value={{ selectedScreen, setSelectedScreen }}>
            {children}
        </ScreenContext.Provider>
    );
};

export { ScreenContext, ScreenContextProvider };
